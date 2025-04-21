from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession 
from app.models.screening_questions import ScreeningQuestion
from app.models.disorder import Disorder
from app.models.screening import Screening
from app.models.node import Node_Center
from sqlalchemy import select
from collections import defaultdict

class ScreeningService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_screening_questions_service(self, screening_id: int, client_age: int):
        # Query screening questions filtered by screening_id and age limits.
        stmt = select(
            ScreeningQuestion.question,    
            Disorder.id.label("disorder_id"),       
            Disorder.disorder_name
        ).join(
            Disorder, ScreeningQuestion.disorder_id == Disorder.id
        ).where(
            ScreeningQuestion.screening_id == screening_id,
            ScreeningQuestion.age_lower_limit <= client_age,
            ScreeningQuestion.age_upper_limit >= client_age
        )

        result = await self.db.execute(stmt)
        rows = result.all()

        print(rows)

        if not rows:
            raise Exception("No screening questions found for the given criteria.")

        # Group questions by disorder name and id.
        grouped_questions = defaultdict(list)
        for question, disorder_id, disorder_name in rows:
            grouped_questions[(disorder_id, disorder_name)].append(question)

        # Fetch the screening name.
        screening_stmt = select(Screening.screening_name).where(Screening.id == screening_id)
        screening_result = await self.db.execute(screening_stmt)
        screening_name = screening_result.scalar()

        if not screening_name:
            raise Exception("Screening not found.")

        # Build the final output structure.
        questionnaire = [
            {
                "id": screening_id,
                "screeningName": screening_name,
                "testList": [
                    {  
                        "disorderId": disorder_id,  # Add disorder ID here
                        "disorderName": disorder_name, 
                        "questions": questions
                    }
                    for (disorder_id, disorder_name), questions in grouped_questions.items()
                ]
            }
        ]

        return questionnaire
    
    async def get_screening_questionnaire_list_service(self, node_id):
        # select screening_id and screening_name from screening table where center_id = center_id from node_center table where node_id = node_id
        stmt = select(
            Screening.id,
            Screening.screening_name
        ).join(
            Node_Center, Node_Center.center_id == Screening.center_id
        ).where(
            Node_Center.node_id == node_id and Node_Center.is_active == True            
        )
       
        result = await self.db.execute(stmt)
        rows = result.all()

        # format it to array of objects
        questionnaire_list = [
            {
                "id": screening_id,
                "screening_name": screening_name
            }
            for screening_id, screening_name in rows
        ]

        return questionnaire_list
       
