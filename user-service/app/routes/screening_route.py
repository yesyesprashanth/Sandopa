from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.screening_controller import ScreeningController
from app.schemas.screening_schema import ScreeningQuestionnaireRequest
from app.schemas.response_schema import StandardResponse
router = APIRouter()


def get_screening_controller(db:AsyncSession = Depends(get_db)) ->ScreeningController:
    return ScreeningController(db)

@router.post('/', response_model=StandardResponse)
async def get_screening_Questions(screening_data:ScreeningQuestionnaireRequest, screening_controller:ScreeningController=Depends(get_screening_controller)):
    return await screening_controller.get_screening_questions_controller(screening_data)

@router.get('/sq-list', response_model=StandardResponse)
async def get_screening_questionnaire_list(node_id:str, screening_controller:ScreeningController=Depends(get_screening_controller)):
    return await screening_controller.get_screening_questionnaire_list_controller(node_id)

