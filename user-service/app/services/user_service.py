from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user_schema import UserVerify
from app.models.user import User
from sqlalchemy import select

class UserService:
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_user_password(self, user_data):
        try:
            print(f'general_service {user_data}')
            user = User(
                user_type = user_data["user_type"],
                user_id = user_data["user_id"],
                organization_id = user_data["organization_id"],
                email_id = user_data["email_id"],
                password = "123456",
                is_active = True
            )
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
        except Exception as e:
            print(e)
            await self.db.rollback()
            raise e
    
    async def verify_user(self, user_data:UserVerify):
        try:
             # Query the database for the user with the given email_id
            result = await self.db.execute(select(User).where(User.email_id == user_data.email_id))
            user = result.scalar_one_or_none()

            if user is None:
                return False  # User not found
            
            print(user)

            data = {
                "user_type": user.user_type,
                "user_id": user.user_id,
                "email_id": user.email_id,
                "organization_id": user.organization_id
            }

            if user.password == user_data.password:
                return {"data":data}  # Password matches
            else:
                return {"data":""}  # Password does not match
            
        except Exception as e:
            print(e)
            await self.db.rollback()
            raise e

    

