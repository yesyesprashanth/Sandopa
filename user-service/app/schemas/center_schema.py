from pydantic import BaseModel, EmailStr

class CenterCreateRequest(BaseModel):    
    center_id:str
    center_name:str
    contact_name:str    
    phone:str
    email_id:EmailStr
    address:str
    state:str
    city:str
    country:str
    hub_id: int