from pydantic import BaseModel, EmailStr

class HubCreateRequest(BaseModel):    
    hub_name:str
    contact_person:str
    phone:str
    email_id:EmailStr
    address:str
    city:str
    state:str
    country:str