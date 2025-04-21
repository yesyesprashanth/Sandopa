from app.config.database import Base
from sqlalchemy import String, Integer, Boolean
from sqlalchemy import Column

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)    
    user_type = Column(String, index=True)
    user_id = Column(String, index=True)
    organization_id = Column(String, index=True)
    email_id = Column(String, unique=True, index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)