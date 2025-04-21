from app.config.database import Base
from sqlalchemy import Column, String, Integer, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

class Center(Base):
    __tablename__ = "centers"

    id = Column(Integer, primary_key=True, index=True)    

    center_id = Column(String, nullable=False, unique=True)
    center_name = Column(String, nullable=False)
    contact_name = Column(String, nullable=False)    
    phone = Column(String, nullable=False)
    email_id = Column(String, nullable=False, unique=True)
    address = Column(String, nullable=False)
    state = Column(String, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)
    hub_id = Column(Integer, ForeignKey("hubs.id"))
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now())



  
