from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from macro_tracker_backend.models import User
from macro_tracker_backend.auth import require_admin, get_current_user
from macro_tracker_backend.database import get_db
from macro_tracker_backend import schemas


router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(require_admin)]
)


@router.get("/users/", response_model=list[schemas.UserOut])
def get_users(
    db: Session = Depends(get_db),
    _: User = Depends(require_admin)  # Enforces admin check
):
    return db.query(User).all()

@router.get("/only")
def read_admin_data(current_user: User = Depends(get_current_user)):
    return {"message": "Welcome, admin!"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {user_id} deleted"}
