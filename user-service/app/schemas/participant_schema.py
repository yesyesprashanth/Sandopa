from pydantic import BaseModel


class ParticipantCreateRequest(BaseModel):    
    participant_id:str
    participant_name:str
    participant_age:int
    gender:str
    phone:str
    group_id:int
    node_id:str
