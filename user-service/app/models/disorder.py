from app.config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class Disorder(Base):
    __tablename__ = "disorders"

    id = Column(Integer, primary_key=True, index=True)
    disorder_name = Column(String, index=True)
    disorder_description = Column(String, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    