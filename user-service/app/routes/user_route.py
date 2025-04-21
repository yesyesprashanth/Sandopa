from app.schemas.user_schema import UserVerify
from fastapi import APIRouter, Depends
from app.schemas.response_schema import StandardResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.user_controller import UserController

router = APIRouter()


def get_user_controller(db:AsyncSession=Depends(get_db))-> UserController:
    if not db:
        raise Exception("Database connection not established")
    if not isinstance(db, AsyncSession):
        raise Exception("Invalid database connection")
    if not db.is_active:
        raise Exception("Database connection is not active")
    return UserController(db)

@router.post('/verify-credentials', response_model=StandardResponse)
async def verify_credentials(user_data:UserVerify, user_controller = Depends(get_user_controller)):
    return await user_controller.user_verify_controller(user_data)

