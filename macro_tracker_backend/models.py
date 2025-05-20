from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    goal_protein = Column(Integer)
    goal_carbs = Column(Integer)
    goal_fat = Column(Integer)

    meals = relationship("Meal", back_populates="user")


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date)
    meal_name = Column(String)

    user = relationship("User", back_populates="meals")
    foods = relationship("Food", back_populates="meal")


class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    meal_id = Column(Integer, ForeignKey("meals.id"))
    name = Column(String)
    protein = Column(Integer)
    carbs = Column(Integer)
    fats = Column(Integer)
    calories = Column(Integer)

    meal = relationship("Meal", back_populates="foods")
