from app.services.facilitator_service import FacilitatorService
from app.schemas.facilitator_schema import FacilitatorCreateRequest
from app.schemas.response_schema import StandardResponse
from fastapi import HTTPException
from app.services.user_service import UserService
from loguru import logger

class FacilitatorController:
    def __init__(self, db):
        self.facilitator_service = FacilitatorService(db)
        self.user_service = UserService(db)

    
    async def create_facilitator_controller(self, facilitator_data:FacilitatorCreateRequest):
        try:
            response = await self.facilitator_service.create_facilitator(facilitator_data)

            user_credentials = {
                "user_type": "facilitator",
                "user_id": str(response["data"]),
                "organization_id":facilitator_data.node_id,
                "email_id":facilitator_data.email_id,
                "password":123456,
                "is_active":True
            }

            await self.user_service.create_user_password(user_credentials)


            response = StandardResponse(
                status="success",
                message="Facilitator created successfully",
                data=response["data"] 
            )

            return response
        except Exception as err:
            logger.error(f"Error creating facilitator: {err}")
            raise HTTPException(status_code=500, detail="An error occurred while creating the facilitator")

