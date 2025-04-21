from app.config.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, TIMESTAMP
from sqlalchemy.sql import func

class Facilitator(Base):
    __tablename__ = "facilitators"

    id = Column(Integer, primary_key=True, index=True)
    facilitator_name = Column(String, index=True)
    phone = Column(String, index=True)
    email_id = Column(String, unique=True, index=True) 
    node_id = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now())

