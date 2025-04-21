from fastapi import Depends
from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.center_controller import CenterController
from app.schemas.center_schema import CenterCreateRequest
from app.schemas.response_schema import StandardResponse
router = APIRouter()


def get_center_controller(db:AsyncSession=Depends(get_db))->CenterController:
    return CenterController(db)


@router.post('/', response_model=StandardResponse)
async def create_center_route(center_data:CenterCreateRequest, center_controller = Depends(get_center_controller))->StandardResponse:
    print(center_data)
    return await center_controller.create_center_controller(center_data)


@router.get('/by-hub/{hub_id}', response_model=StandardResponse)
async def get_centers_by_hub(hub_id: str, center_controller: CenterController = Depends(get_center_controller)):
    return await center_controller.get_centers_by_hub_controller(hub_id)