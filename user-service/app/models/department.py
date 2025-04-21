from app.config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    department_name = Column(String, index=True)