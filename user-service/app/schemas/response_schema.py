from pydantic import BaseModel
from typing import Optional, Any


class StandardResponse(BaseModel):
    status: str
    message: str
    data: Optional[Any] = None
