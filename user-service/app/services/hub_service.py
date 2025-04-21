from app.schemas.hub_schema import HubCreateRequest
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.hub import Hub
from sqlalchemy import select
class HubService:

    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_hub(self, hub_data:HubCreateRequest):
        hub_data_json = hub_data.model_dump()
   
        data:Hub = Hub(**hub_data_json)      
        self.db.add(data)
        await self.db.commit()        
        await self.db.refresh(data)      
        return {"data":data.id}
        
    # list id and hub_name from the table
    async def list_hub(self):
        data = await self.db.execute(select(Hub))           
        data = data.scalars().all()


        data = [{"id":i.id, "hub_name":i.hub_name} for i in data]

        return {"data":data}