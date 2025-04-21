from app.schemas.response_schema import StandardResponse
from app.services.user_service import UserService   

class UserController:
    def __init__(self, db):
        self.user_service = UserService(db)

    async def user_verify_controller(self, user_data):
        response = await self.user_service.verify_user(user_data)       
        response = StandardResponse(
            status="succsss",
            message="user verified successfully",
            data=response["data"]
        )

        return response
