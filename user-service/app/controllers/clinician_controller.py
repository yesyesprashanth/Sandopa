from app.schemas.clinician_schema import ClinicianCreateRequest
from app.services.clinician_service import ClinicianService
from app.services.user_service import UserService
from app.schemas.response_schema import StandardResponse
from sqlalchemy.ext.asyncio import AsyncSession
from loguru import logger

class ClinicianController:
    def __init__(self, db:AsyncSession):
        self.clinician_service = ClinicianService(db)
        self.user_service = UserService(db)

    async def create_clinician_controller(self, clinician_data:ClinicianCreateRequest):
        try:
            response = await self.clinician_service.create_clinician(clinician_data)

            user_credentials = {
                "user_type": "clinician",
                "user_id": str(clinician_data.clinician_id),
                "organization_id":clinician_data.center_id,
                "email_id":clinician_data.email_id,
                "password":123456,
                "is_active":True
            }

            await self.user_service.create_user_password(user_credentials)

            response = StandardResponse(
                status="success",
                message="Clinician created successfully",
                data=response["data"] 
            )

            return response
        except Exception as err:
            logger.error(f"Error creating clinician: {err}")