from pydantic import BaseModel, EmailStr
from typing import Optional

class NodeCreaterequest(BaseModel):    
    node_id: str
    node_name: str
    contact_person: str
    phone: str
    email_id: EmailStr
    address: str
    city: str
    state: str
    country: str
    subscription: str
    hub_id: str
    center_id: Optional[str] = None  # Optional center ID

class NodeCenterConnectRequest(BaseModel):
    node_id: str
    center_id: str