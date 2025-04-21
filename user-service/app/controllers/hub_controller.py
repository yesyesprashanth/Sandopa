from sqlalchemy.ext.asyncio import AsyncSession
from app.services.hub_service import HubService
from app.schemas.hub_schema import HubCreateRequest
from app.schemas.response_schema import StandardResponse
from app.services.user_service import UserService

class HubController:
    def __init__(self, db:AsyncSession):
        self.db = db
        self.hub_service = HubService(db)
        self.user_service = UserService(db)
    
    async def create_hub_controller(self, hub_data:HubCreateRequest):
        response = await self.hub_service.create_hub(hub_data)
        
        user_credentials = {
            "user_type": "hub",
            "user_id": str(response["data"]),
            "organization_id":"",
            "email_id":hub_data.email_id,
            "password":"123456",
            "is_active":True
        }

        print(user_credentials)

        await self.user_service.create_user_password(user_credentials)
        
        response = StandardResponse(
            status="succsss",
            message="Hub created successfully",
            data=response["data"]
        )

        return response
    
    async def list_hub_controller(self):
        response = await self.hub_service.list_hub()
        response = StandardResponse(
            status="success",
            message="Hub list",
            data=response["data"]
        )

        return response

