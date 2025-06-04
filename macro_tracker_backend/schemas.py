from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

# Food Schemas
class FoodBase(BaseModel):
    name: str
    protein: float
    carbs: float
    fats: float
    calories: float

class FoodCreate(FoodBase):
    meal_id: int
    serving_size: float
    serving_unit: str
    servings: int
    time_logged: Optional[str] = None
class FoodOut(FoodBase):
    id: int
    meal_id: int

    class Config:
        orm_mode = True


# Meal Schemas
class MealBase(BaseModel):
    date: date
    meal_name: str

class MealCreate(BaseModel):
    date: date
    meal_name: str

class MealOut(MealBase):
    id: int
    user_id: int
    foods: list[FoodOut] = []

    class Config:
        orm_mode = True


# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password_hash: str = Field(alias="password")

class UserOut(UserBase):
    id: int
    role: str  
    
    class Config:
        from_attributes = True

class Config:
        orm_mode = True
        
class UserLogin(BaseModel):
    email: str
    password_hash: str

