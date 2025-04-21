from pydantic import BaseModel

class ScreeningQuestionnaireRequest(BaseModel):
    screening_id: int
    client_age: int 

class ScreeningResult(BaseModel):
    screening_id: int
    participant_id: str
    disorder_ids: list[int]  
    result:str      
