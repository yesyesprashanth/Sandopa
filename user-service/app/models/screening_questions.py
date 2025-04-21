from app.config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class ScreeningQuestion(Base):
    __tablename__ = "screening_questions"

    id = Column(Integer, primary_key=True, index=True)    
    question = Column(String, index=True)
    age_lower_limit = Column(Integer, index=True)
    age_upper_limit = Column(Integer, index=True)
    screening_id = Column(Integer, ForeignKey("screening.id"))
    disorder_id = Column(Integer, ForeignKey("disorders.id"))
    