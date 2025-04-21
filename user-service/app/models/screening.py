from app.config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, Boolean
from sqlalchemy import func

class Screening(Base):
    __tablename__ = "screening"

    id = Column(Integer, primary_key=True, index=True)
    center_id = Column(String, ForeignKey("centers.center_id"))
    screening_name = Column(String, nullable=False, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    is_private = Column(Boolean, index=True)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now())