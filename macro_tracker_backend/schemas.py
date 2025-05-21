from pydantic import BaseModel
from datetime import date
from typing import Optional

# Food Schemas
class FoodBase(BaseModel):
    name: str
    protein: int
    carbs: int
    fats: int
    calories: int

class FoodCreate(FoodBase):
    meal_id: int

class FoodOut(FoodBase):
    id: int
    meal_id: int

    class Config:
        orm_mode = True


# Meal Schemas
class MealBase(BaseModel):
    date: date
    meal_name: str

class MealCreate(MealBase):
    user_id: int

class MealOut(MealBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password_hash: str
    goal_protein: int
    goal_carbs: int
    goal_fat: int

class UserOut(UserBase):
    id: int
    goal_protein: int
    goal_carbs: int
    goal_fat: int
    role: str  
    
    class Config:
        from_attributes = True

class Config:
        orm_mode = True
        
class UserLogin(BaseModel):
    email: str
    password_hash: str

