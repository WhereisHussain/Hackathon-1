from sqlmodel import SQLModel, Field, create_all
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class UserProfile(SQLModel, table=True):
    id: str = Field(primary_key=True) # Matches Better Auth User ID
    email: str
    software_background: str = "Beginner"
    hardware_background: str = "Beginner"
    interests: str = ""
    target_language: str = "en"

# Add more models as needed for the RAG agent interactions or notes

def init_db(engine):
    SQLModel.metadata.create_all(engine)
