from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Date
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="user") 
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
    serving_size = Column(Float)
    serving_unit = Column(String)
    servings = Column(Integer)
    time_logged = Column(DateTime, nullable=True)


    meal = relationship("Meal", back_populates="foods")
