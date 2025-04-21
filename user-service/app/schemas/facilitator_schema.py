from pydantic import BaseModel, EmailStr


class FacilitatorCreateRequest(BaseModel):        
    facilitator_name:str
    phone:str
    email_id:EmailStr        
    node_id:str
    