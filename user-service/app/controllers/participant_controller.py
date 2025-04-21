from fastapi import HTTPException
from app.schemas.participant_schema import ParticipantCreateRequest
from app.schemas.response_schema import StandardResponse
from app.services.participant_service import ParticipantService
from app.schemas.screening_schema import ScreeningResult
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession


class ParticipantController:
    def __init__(self, db:AsyncSession):
        self.participant_service = ParticipantService(db)

    async def create_participant_controller(self, participant_data:ParticipantCreateRequest):
        try:
            response = await self.participant_service.create_participant(participant_data)          

            response = StandardResponse(
                status="success",
                message="Participant created successfully",
                data=response["data"] 
            )

            return response
        except Exception as err:
            logger.error(f"Error creating participant: {err}")


    async def save_screening_result_controller(self, request: ScreeningResult):
        try:
            await self.participant_service.update_participant_result_service(request.participant_id, request.result)
            data = await self.participant_service.save_participant_referred_service(request.participant_id, request.disorder_ids, request.screening_id)
            response = {
                "status": "success",
                "message": "Participant result saved successfully",
                "data": data
            }
            return response
        except Exception as e:
            # Optionally, log the exception here
            raise HTTPException(status_code=400, detail=str(e))
    
    
    async def get_participants_with_referred_disorders_controller(self, node_id:str):
        try:
            data = await self.participant_service.get_participants_with_referred_disorders(node_id)
            response = {
                "status": "success",
                "message": "Participants with referred disorders retrieved successfully",
                "data": data
            }

            return response
        except Exception as e:
            # Optionally, log the exception here
            raise HTTPException(status_code=400, detail=str(e))
