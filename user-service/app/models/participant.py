from app.config.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

class Participant_Group(Base):
    __tablename__ = "participant_group"

    id = Column(Integer, primary_key=True, index=True)
    group_name= Column(String, index=True)
    node_id = Column(String, index=True)

class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(String, unique=True, index=True)
    participant_name = Column(String, index=True)
    participant_age = Column(Integer, index=True)
    gender = Column(String, index=True)
    phone = Column(String, index=True)
    group_id = Column(Integer, ForeignKey("participant_group.id"))
    node_id = Column(String, index=True)    
    result = Column(String, index=True)
    subscription = Column(String, index=True, default="Free")

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())


class ParticipantReferred(Base):
    __tablename__= "participant_referred"
    id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(String, index=True)
    referred_disorder_id = Column(Integer, ForeignKey("disorders.id"))
    screening_id = Column(Integer, ForeignKey("screening.id"))
    