from .routers import admin
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta

from . import models, schemas
from .database import engine, SessionLocal
from .auth import hash_password, verify_password, create_access_token
from .auth import get_current_user


from fastapi.security import OAuth2PasswordRequestForm

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
print("✅ FastAPI app initialized")

# Allow frontend to connect (adjust later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
        goal_protein=user.goal_protein,
        goal_carbs=user.goal_carbs,
        goal_fat=user.goal_fat,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------- MEALS ----------

@app.post("/meals/", response_model=schemas.MealOut)
def create_meal(meal: schemas.MealCreate, db: Session = Depends(get_db)):
    db_meal = models.Meal(**meal.dict())
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal

@app.get("/meals/", response_model=list[schemas.MealOut])
def get_meals(db: Session = Depends(get_db)):
    return db.query(models.Meal).all()

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
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},  # include role
        expires_delta=timedelta(minutes=60)
)
    return {"access_token": access_token, "token_type": "bearer"}

from fastapi import Depends
from .auth import get_current_user
from . import schemas, models

@app.get("/me/", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

app.include_router(admin.router) 