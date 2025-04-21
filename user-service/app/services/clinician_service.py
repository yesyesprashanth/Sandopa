from app.schemas.clinician_schema import ClinicianCreateRequest
from app.models.clinician import Clinician
from sqlalchemy.ext.asyncio import AsyncSession

class ClinicianService():
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_clinician(self, clinician_data:ClinicianCreateRequest):
        clinician_data_json = clinician_data.model_dump()
        clinician = Clinician(**clinician_data_json)
        self.db.add(clinician)
        await self.db.commit()
        await self.db.refresh(clinician)   
        return {'data':clinician.clinician_id}