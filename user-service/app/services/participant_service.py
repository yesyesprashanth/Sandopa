from app.models.participant import Participant
from app.schemas.participant_schema import ParticipantCreateRequest
from app.models.participant import ParticipantReferred
from app.models.disorder import Disorder
from sqlalchemy import func, select
from sqlalchemy.orm import aliased


class ParticipantService():
    def __init__(self, db):
        self.db = db

    async def create_participant(self, participant_data:ParticipantCreateRequest):        
        participant = Participant(**participant_data.model_dump())
        self.db.add(participant)
        await self.db.commit()
        await self.db.refresh(participant)
        return {'data':participant.id}

    async def update_participant_result_service(self, participant_id, result):
        # in Participant table id is the primary_key where participant_id us a string
            update_query = (Participant.__table__.update().where(Participant.participant_id == participant_id).values(result=result))
            await self.db.execute(update_query)
            return None
    
    async def save_participant_referred_service(self, participant_id, disorder_ids, screening_id):
                
        for id in disorder_ids:
            participant_referred = ParticipantReferred(participant_id=participant_id, referred_disorder_id=id, screening_id=screening_id)
            self.db.add(participant_referred)
            await self.db.commit()
            await self.db.refresh(participant_referred)
            
        return None
    
    async def get_participants_with_referred_disorders(self, node_id):        
   
        # Validate the node_id parameter
        if not node_id:
            raise ValueError("node_id parameter is required")

        # Log the input parameter
        print(f"Received node_id: {node_id}")

        # Alias for the Disorder table to simplify joins
        disorder_alias = aliased(Disorder)

        # Construct the query
        query = (
                select(
                    Participant.participant_id,
                    Participant.participant_name,
                    Participant.participant_age,
                    Participant.gender,
                    Participant.phone,
                    func.coalesce(
                        func.array_to_string(
                            func.array_agg(disorder_alias.disorder_name), 
                            ', '
                        ), 
                        ''
                    ).label("referred_disorder_names")
                )
                .select_from(Participant)
                .join(
                    ParticipantReferred, 
                    Participant.participant_id == ParticipantReferred.participant_id,
                    isouter=True  # Use outer join to include participants with no referrals
                )
                .join(
                    disorder_alias, 
                    ParticipantReferred.referred_disorder_id == disorder_alias.id,
                    isouter=True  # Use outer join to include participants with no referrals
                )
                .where(Participant.node_id == node_id)
                .group_by(
                    Participant.participant_id,
                    Participant.participant_name,
                    Participant.participant_age,
                    Participant.gender,
                    Participant.phone
                )
                .order_by(
                    Participant.participant_id.desc()
                )
            )
        
        try:
            # Execute the query and fetch results
            result = await self.db.execute(query)
            rows = result.fetchall()

            print(rows)

            # Convert rows to a list of dictionaries
            participants = [
                {
                    "id": idx + 1,  # Serial number starting from 1
                    "participant_id": row.participant_id,
                    "participant_name": row.participant_name,
                    "participant_age": row.participant_age,
                    "gender": row.gender,
                    "phone": row.phone,
                    "referred_disorder_names": row.referred_disorder_names,
                    "Provisional diagnosis": ""
                }
                for idx, row in enumerate(rows)
            ]

            # Return the list of participants (empty list if no matches)
            return participants

        except Exception as e:
            # Log the exception and re-raise it
            print(f"Error executing query: {e}")
            raise


        

            