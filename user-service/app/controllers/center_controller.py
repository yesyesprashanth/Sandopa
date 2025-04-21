from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.center_service import CenterService
from app.schemas.center_schema import CenterCreateRequest
from app.schemas.response_schema import StandardResponse
from app.services.user_service import UserService
from loguru import logger

class CenterController:
    def __init__(self, db:AsyncSession):       
        self.center_service = CenterService(db)
        self.user_service = UserService(db) 
        self.db = db

    async def create_center_controller(self, center_data:CenterCreateRequest):
        try:
            logger.info("Center service/controller called")
            response = await self.center_service.create_center(center_data)

            logger.info(center_data)
            
            user_credentials = {
                "user_type": "center",
                "user_id": str(center_data.center_id),
                "organization_id":str(center_data.hub_id),
                "email_id":center_data.email_id,
                "password":123456,
                "is_active":True
            }

            await self.user_service.create_user_password(user_credentials)

            logger.info("Center service/controller success")

            response = StandardResponse(
                status="success",
                message="Center created successfully",
                data=response["data"]        
            )

            return response
        except Exception as e:
            logger.info("Center service/controller errorError")
            error_response = StandardResponse(
                status="error",
                message="An error occurred while creating the center",
                data=None            
            )
            raise HTTPException(status_code=500, detail=error_response.model_dump())

    async def get_centers_by_hub_controller(self, hub_id: str):
        try:
            response = await self.center_service.get_centers_by_hub(hub_id)
            return StandardResponse(
                status="success",
                message="Centers fetched successfully",
                data=response["data"]
            )
        except Exception as e:
            logger.error(f"Error in get_centers_by_hub_controller: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch centers")

