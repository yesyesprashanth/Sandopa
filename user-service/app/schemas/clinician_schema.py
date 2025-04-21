from pydantic import BaseModel, EmailStr


class ClinicianCreateRequest(BaseModel):
    clinician_id:str
    clinician_name:str    
    phone:str
    email_id:EmailStr       
    center_id:str
