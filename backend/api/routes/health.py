from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    return {
        "status": "healthy",
        "service": "HerChain AI Backend",
        "components": {
            "api": "running",
            "ml_engine": "ready",
            "ai_agents": "ready",
            "blockchain_service": "ready",
        },
    }


@router.get("/dashboard/{user_id}")
async def get_dashboard(user_id: str):
    """Get dashboard data for a user. Returns sample data for demo."""
    return {
        "user_id": user_id,
        "wellness_score": 72,
        "risk_score": 58,
        "risk_level": "Moderate",
        "bmi_trends": [
            {"week": "W1", "bmi": 24.2},
            {"week": "W2", "bmi": 24.5},
            {"week": "W3", "bmi": 24.8},
            {"week": "W4", "bmi": 24.6},
            {"week": "W5", "bmi": 25.1},
            {"week": "W6", "bmi": 25.3},
            {"week": "W7", "bmi": 25.0},
            {"week": "W8", "bmi": 24.8},
        ],
        "risk_breakdown": {
            "obesity": 62,
            "gdm": 45,
            "t2d": 58,
            "hormonal": 35,
            "cardiovascular": 28,
        },
    }
