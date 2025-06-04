from macro_tracker_backend.routers import admin
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta

import models, schemas
from database import engine, SessionLocal
from auth import hash_password, verify_password, create_access_token
from auth import get_current_user

from pydantic import Field
from fastapi.security import OAuth2PasswordRequestForm
import os
import requests
from fastapi import APIRouter, Query
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.model_config = {"populate_by_name": True}
print("✅ FastAPI app initialized")

# Allow frontend to connect (adjust later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://macro-tracker-gamma.vercel.app",  # ✅ Frontend domain
        "https://macro-tracker-6przf2qq4-hernerdezs-projects.vercel.app",  # ✅ Vercel deployment
        "http://localhost:3000",                   # ✅ Local dev
        "http://localhost:5173",                   # ✅ Local dev
        "http://127.0.0.1:5173",                   # ✅ Local dev alternative
        "http://127.0.0.1:5174",                   # ✅ Local dev alternative
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- USERS ----------

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password_hash)
    db_user = models.User(
        email=user.email,
        password_hash=hashed_pw,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------- MEALS ----------

@app.post("/meals/", response_model=schemas.MealOut)
def create_meal(
    meal: schemas.MealCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  # 🟢 this grabs the current logged-in user
):
    db_meal = models.Meal(
        date=meal.date,
        meal_name=meal.meal_name,
        user_id=current_user.id  # 🟢 auto-assign user_id here
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal


@app.get("/meals/", response_model=list[schemas.MealOut])
def get_my_meals(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Meal).filter(models.Meal.user_id == current_user.id).all()

# ---------- FOODS ----------

@app.post("/foods/", response_model=schemas.FoodOut)
def create_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    db_food = models.Food(**food.dict())
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food

@app.get("/foods/", response_model=list[schemas.FoodOut])
def get_foods(db: Session = Depends(get_db)):
    return db.query(models.Food).all()

# ---------- LOGIN ----------

@app.post("/login/")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"Login attempt for email: {form_data.username}")
    
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user:
        print(f"No user found with email: {form_data.username}")
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    print(f"Found user: {user.email}")
    print(f"Verifying password...")
    
    if not verify_password(form_data.password, user.password_hash):
        print("Password verification failed")
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    print("Password verified successfully")
    
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(minutes=60)
    )
    print("Access token created successfully")
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me/", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user


router = APIRouter()

@router.get("/search-food/")
def search_food(query: str = Query(...)):
    api_key = os.getenv("USDA_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="USDA API key not configured")
    
    url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    try:
        response = requests.get(url, params={"query": query, "api_key": api_key})
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching food data: {str(e)}")

app.include_router(admin.router)
app.include_router(router)

@app.get("/dashboard/", response_model=list[schemas.MealOut])
def dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    meals = db.query(models.Meal).filter(models.Meal.user_id == current_user.id).all()
    for meal in meals:
        meal.foods = db.query(models.Food).filter(models.Food.meal_id == meal.id).all()
    return meals

