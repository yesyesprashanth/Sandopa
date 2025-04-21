from fastapi import HTTPException
from app.schemas.screening_schema import ScreeningQuestionnaireRequest, ScreeningResult
from app.schemas.response_schema import StandardResponse
from app.services.screening_service import ScreeningService
from app.services.participant_service import ParticipantService
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession


class ScreeningController:
    def __init__(self, db:AsyncSession):
        self.screening_service = ScreeningService(db)
        self.participant_service = ParticipantService(db)
    
    async def get_screening_questions_controller(self, request: ScreeningQuestionnaireRequest):
        try:
            data = await self.screening_service.get_screening_questions_service(request.screening_id, request.client_age)
            response = {
                "status": "success",
                "message": "screening Questionnaire",
                "data": data
            }
            return response
        except Exception as e:
            # Optionally, log the exception here
            raise HTTPException(status_code=400, detail=str(e))
        
    async def get_screening_questionnaire_list_controller(self, node_id):
        try:
            data = await self.screening_service.get_screening_questionnaire_list_service(node_id)
            response = {
                "status": "success",
                "message": "screening Questionnaire",
                "data": data
            }
            return response
        except Exception as e:
            # Optionally, log the exception here
            raise HTTPException(status_code=400, detail=str(e))
        
    