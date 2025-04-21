from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.clinician_controller import ClinicianController
from app.schemas.clinician_schema import ClinicianCreateRequest
from app.schemas.response_schema import StandardResponse
router = APIRouter()

def get_clinician_controller(db:AsyncSession=Depends(get_db))->ClinicianController:
    return ClinicianController(db)


@router.post('/', response_model=StandardResponse)
async def create_center_route(center_data:ClinicianCreateRequest, clinician_controller = Depends(get_clinician_controller))->StandardResponse:
    return await clinician_controller.create_clinician_controller(center_data)
