from fastapi import APIRouter, Depends
from app.schemas.response_schema import StandardResponse
from app.schemas.node_schema import NodeCreaterequest, NodeCenterConnectRequest
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.node_controller import NodeController
from loguru import logger   

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}

def get_node_controller(db:AsyncSession = Depends(get_db))->NodeController:
    return NodeController(db)


@router.post('/', response_model=StandardResponse)
async def create_user_route(node_data:NodeCreaterequest, node_controller:NodeController = Depends(get_node_controller))->StandardResponse:
    logger.info("Creating node route")
    return await node_controller.create_node_controller(node_data)

@router.post('/node-center', response_model=StandardResponse)
async def create_node_center_route(node_data:NodeCenterConnectRequest, node_controller:NodeController = Depends(get_node_controller))->StandardResponse:
    logger.info("Creating node center route")
    return await node_controller.connect_node_center_controller(node_data)

@router.get('/node-list', response_model=StandardResponse)
async def get_node_list_route(node_controller:NodeController = Depends(get_node_controller))->StandardResponse:
    logger.info("Getting node list route")
    return await node_controller.get_node_list_controller()
