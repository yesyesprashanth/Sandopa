from pydantic import BaseModel

class UserVerify(BaseModel):
    email_id: str
    password: str
    