from app.config.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func

class Clinician(Base):
    __tablename__ = "clinicians"
    id = Column(Integer, primary_key=True, index=True)
    clinician_id = Column(String, unique=True, index=True)
    clinician_name = Column(String, index=True)    
    phone = Column(String, index=True)
    email_id = Column(String, unique=True, index=True)
    center_id = Column(String, ForeignKey("centers.center_id"))    
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now())


    