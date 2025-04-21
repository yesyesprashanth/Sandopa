from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession 
from app.models.node import Node, Node_Center
from app.schemas.node_schema import NodeCreaterequest, NodeCenterConnectRequest
from loguru import logger

class NodeService:
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_node(self, node_data:NodeCreaterequest):
        try:           
            # Create the node
            node_data_dict = node_data.model_dump(exclude={'center_id'})
            node = Node(**node_data_dict)           
            self.db.add(node)           
            await self.db.commit()           
            await self.db.refresh(node)

            # If center_id is provided, create the node-center connection
            if node_data.center_id:
                node_center = Node_Center(
                    node_id=node.node_id,
                    center_id=node_data.center_id,
                    is_active=True
                )
                self.db.add(node_center)
                await self.db.commit()
    
            return {"data": node.node_id}
        except Exception as err:
            logger.error(f"Error creating node: {err}")
            raise HTTPException(status_code=500, detail="An error occurred while creating the node")
        
    async def connect_node_center(self, node_center_data:NodeCenterConnectRequest):
        try:
             node_center = Node_Center(**node_center_data.model_dump())
             self.db.add(node_center)
             await self.db.commit()
             await self.db.refresh(node_center)
             return {"data": node_center.id}
        except Exception as err:
            logger.error(f"Error connecting node with center: {err}")
            raise HTTPException(status_code=500, detail="An error occurred while connecting node with center")
        
    async def get_all_nodes(self):
        try:
            nodes = await self.db.execute(Node.__table__.select())
            return nodes.fetchall()
        except Exception as err:
            logger.error(f"Error fetching all nodes: {err}")
            raise HTTPException(status_code=500, detail="An error occurred while fetching all nodes")