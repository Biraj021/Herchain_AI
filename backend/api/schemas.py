from pydantic import BaseModel
from typing import Optional


class UserProfile(BaseModel):
    name: str
    email: str
    life_stage: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    activity_level: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    user_profile: Optional[UserProfile] = None


class PredictionRequest(BaseModel):
    age: int = 28
    bmi: float = 25.0
    activity_level: str = "light"
    sleep_hours: float = 6.5
    stress_level: int = 6
    life_stage: str = "pregnancy"
    family_history: bool = False


class SimulationRequest(BaseModel):
    base_prediction: dict
    activity_boost_percent: int = 20


class BlockchainStoreRequest(BaseModel):
    report_hash: str
    report_type: str = "AI Health Assessment Report"


class BlockchainVerifyRequest(BaseModel):
    report_hash: str
