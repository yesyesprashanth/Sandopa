from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas.center_schema import CenterCreateRequest
from app.models.center import Center
from loguru import logger
from fastapi import HTTPException

class CenterService():
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_center(self, center_data:CenterCreateRequest):
        try:            
            center_data_json = center_data.model_dump()            
            center:Center = Center(**center_data_json)
            self.db.add(center)
            await self.db.commit()
            await self.db.refresh(center)  
            return {'data':center.center_id}
        
        except Exception as e:
            print(e)

    async def get_centers_by_hub(self, hub_id: str):
        try:
            query = select(Center).where(Center.hub_id == hub_id)
            result = await self.db.execute(query)
            centers = result.scalars().all()
            return {"data": [{"id": center.id, "center_name": center.center_name} for center in centers]}
        except Exception as err:
            logger.error(f"Error fetching centers by hub: {err}")
            raise HTTPException(status_code=500, detail="Error fetching centers")



