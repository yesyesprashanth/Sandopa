from app.config.database import Base
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

class Node(Base):
    __tablename__ = "node"
    id = Column(Integer, primary_key=True, index=True)
        
    node_id = Column(String, nullable=False, unique=True)
    node_name = Column(String, nullable=False)
    contact_person = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email_id = Column(String, nullable=False, unique=True)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    subscription = Column(String, nullable=False, default="Free")
    hub_id = Column(String, ForeignKey("hub.id"), nullable=False)

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())    


class Node_Center(Base):
    __tablename__ = "node_center"
    id = Column(Integer, primary_key=True, index=True)

    node_id = Column(String, ForeignKey("node.node_id"))
    center_id = Column(String, ForeignKey("centers.center_id"))
    is_active = Column(Boolean, nullable=False, default=True)

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

class Node_Screening(Base):
    __tablename__ = "node_screening"
    id = Column(Integer, primary_key=True, index=True)

    node_id = Column(String, ForeignKey("node.node_id"))
    screening_id = Column(Integer, ForeignKey("screening.id"))

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

