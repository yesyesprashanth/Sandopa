from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.participant_controller import ParticipantController
from app.schemas.participant_schema import ParticipantCreateRequest 
from app.schemas.screening_schema import ScreeningResult
from app.schemas.response_schema import StandardResponse
router = APIRouter()


def get_participant_controller(db:AsyncSession = Depends(get_db)) ->ParticipantController:
    return ParticipantController(db)

@router.post('/', response_model=StandardResponse)
async def create_participant_route(participant_data:ParticipantCreateRequest, participant_controller:ParticipantController=Depends(get_participant_controller)):
    return await participant_controller.create_participant_controller(participant_data)

@router.post('/save-participant-response', response_model=StandardResponse)
async def save_screening_result(screening_result:ScreeningResult, participant_controller:ParticipantController=Depends(get_participant_controller)):
    return await participant_controller.save_screening_result_controller(screening_result)

@router.get('/get-referred-list', response_model=StandardResponse)
async def get_participants_with_referred_disorders(node_id:str, participant_controller:ParticipantController=Depends(get_participant_controller)):
    return await participant_controller.get_participants_with_referred_disorders_controller(node_id)
    





