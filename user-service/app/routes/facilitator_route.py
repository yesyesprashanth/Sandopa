from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.response_schema import StandardResponse
from app.schemas.facilitator_schema import FacilitatorCreateRequest
from app.config.database import get_db
from app.controllers.facilitator_controller import FacilitatorController
router = APIRouter()

@router.get('/', response_model=StandardResponse)
def get_hello_world():
    response = StandardResponse(
        status="success",
        message="Hello World",
        data=None
    )
    return  response

def get_facilitator_controller(db:AsyncSession=Depends(get_db))-> FacilitatorController:
    if not isinstance(db, AsyncSession) or not db.is_active:
        raise HTTPException(status_code=500, detail="Invalid or inactive database connection")
    return FacilitatorController(db)

@router.post('/', response_model=StandardResponse)
async def create_hub(facilitator_data:FacilitatorCreateRequest, FacilitatorController:FacilitatorController = Depends(get_facilitator_controller)):
    return await FacilitatorController.create_facilitator_controller(facilitator_data)