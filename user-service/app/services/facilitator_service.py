from app.schemas.facilitator_schema import FacilitatorCreateRequest
from app.models.facilitator import Facilitator
from sqlalchemy.ext.asyncio import AsyncSession

class FacilitatorService():
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_facilitator(self, facilitator_data:FacilitatorCreateRequest):
        facilitator_data_json = facilitator_data.model_dump()
        facilitator:Facilitator = Facilitator(**facilitator_data_json)
        self.db.add(facilitator)
        await self.db.commit()
        await self.db.refresh(facilitator)   
        return {'data':facilitator.id}