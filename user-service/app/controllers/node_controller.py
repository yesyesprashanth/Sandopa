from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.node_schema import NodeCreaterequest, NodeCenterConnectRequest
from app.services.node_service import NodeService
from app.schemas.response_schema import StandardResponse
from app.services.user_service import UserService
from loguru import logger

class NodeController:
    def __init__(self, db:AsyncSession):
        self.node_service = NodeService(db)
        self.user_service = UserService(db) 
        j=0

    async def create_node_controller(self, node_data:NodeCreaterequest)->StandardResponse:
        logger.info("Creating node")
        try:
            response = await self.node_service.create_node(node_data)

            user_credentials = {
                "user_type": "node",
                "user_id": str(node_data.node_id),
                "organization_id":"",
                "email_id":node_data.email_id,
                "password":123456,
                "is_active":True
            }

            await self.user_service.create_user_password(user_credentials)

            logger.info("Node created successfully")
            response = StandardResponse(
                status="success",
                message="Node created successfully",
                data=response["data"]            
            )
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail="An error occurred while creating the node")
        
    async def connect_node_center_controller(self, node_center_data:NodeCenterConnectRequest)->StandardResponse:
        try:
            response = await self.node_service.connect_node_center(node_center_data)
            response = StandardResponse(
                status="success",
                message="Node connected to center successfully",
                data=response["data"]
            )
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail="An error occurred while connecting the node to center")

    async def get_node_list_controller(self)->StandardResponse:
        try:
            response = await self.node_service.get_all_nodes()
            response = StandardResponse(
                status="success",
                message="Nodes fetched successfully",
                data=response["data"]
            )
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail="An error occurred while fetching the nodes")