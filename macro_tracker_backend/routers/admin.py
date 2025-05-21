from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models
from ..auth import require_admin
from ..auth import get_current_user
from ..database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(require_admin)]
)


@app.get("/users/", response_model=list[schemas.UserOut])
def get_users(
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin)  # Enforces admin check
):
    return db.query(models.User).all()

@router.get("/only")
def read_admin_data(current_user: models.User = Depends(get_current_user)):
    return {"message": "Welcome, admin!"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {user_id} deleted"}
