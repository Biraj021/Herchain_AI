import numpy as np
from fastapi import APIRouter
from api.schemas import PredictionRequest, SimulationRequest

router = APIRouter()


def calculate_risk(data: PredictionRequest) -> dict:
    """
    Calculate health risk scores using a simplified model.
    In production, this would use trained sklearn models.
    """
    # Feature encoding
    activity_map = {"sedentary": 0, "light": 1, "moderate": 2, "active": 3}
    stage_map = {"pregnancy": 1.2, "postpartum": 1.0, "menopause": 1.1, "wellness": 0.8}

    activity_score = activity_map.get(data.activity_level, 1)
    stage_factor = stage_map.get(data.life_stage, 1.0)

    # Obesity risk calculation
    bmi_risk = max(0, min(100, (data.bmi - 18.5) / (35 - 18.5) * 100))
    activity_penalty = (3 - activity_score) * 10
    obesity_risk = min(100, int(bmi_risk * 0.5 + activity_penalty + np.random.normal(0, 5)))
    obesity_risk = max(10, obesity_risk)

    # GDM risk
    age_factor = max(0, (data.age - 25) * 1.5) if data.life_stage == "pregnancy" else 0
    gdm_risk = min(100, int(
        bmi_risk * 0.3 + age_factor + (10 if data.family_history else 0) +
        stage_factor * 10 + np.random.normal(0, 5)
    ))
    gdm_risk = max(10, gdm_risk)

    # T2D risk
    sleep_penalty = max(0, (8 - data.sleep_hours) * 5)
    stress_penalty = data.stress_level * 3
    t2d_risk = min(100, int(
        bmi_risk * 0.4 + sleep_penalty + stress_penalty * 0.5 +
        activity_penalty * 0.5 + np.random.normal(0, 5)
    ))
    t2d_risk = max(10, t2d_risk)

    # Hormonal risk
    hormonal_risk = min(100, int(
        stress_penalty + sleep_penalty * 0.5 +
        (20 if data.life_stage == "menopause" else 10) +
        np.random.normal(0, 5)
    ))
    hormonal_risk = max(10, hormonal_risk)

    # Cardiovascular risk
    cvd_risk = min(100, int(
        bmi_risk * 0.3 + activity_penalty * 0.5 +
        (data.age - 20) * 0.5 + np.random.normal(0, 5)
    ))
    cvd_risk = max(10, cvd_risk)

    # Overall risk score
    overall_risk = int(
        obesity_risk * 0.3 + gdm_risk * 0.2 + t2d_risk * 0.25 +
        hormonal_risk * 0.15 + cvd_risk * 0.1
    )

    # Risk level
    if overall_risk < 35:
        risk_level = "Low"
    elif overall_risk < 65:
        risk_level = "Moderate"
    else:
        risk_level = "High"

    # Feature importance (Explainable AI)
    total_contribution = bmi_risk + activity_penalty + sleep_penalty + stress_penalty + age_factor
    if total_contribution == 0:
        total_contribution = 1

    return {
        "risk_score": overall_risk,
        "risk_level": risk_level,
        "risk_breakdown": {
            "obesity": obesity_risk,
            "gdm": gdm_risk,
            "t2d": t2d_risk,
            "hormonal": hormonal_risk,
            "cardiovascular": cvd_risk,
        },
        "contributing_factors": [
            {
                "factor": "BMI",
                "importance": round(bmi_risk / total_contribution, 3),
                "description": f"BMI of {data.bmi:.1f} contributes to elevated risk",
            },
            {
                "factor": "Activity Level",
                "importance": round(activity_penalty / total_contribution, 3),
                "description": f"{data.activity_level} activity level affects metabolic health",
            },
            {
                "factor": "Sleep Quality",
                "importance": round(sleep_penalty / total_contribution, 3),
                "description": f"{data.sleep_hours}h average sleep impacts recovery",
            },
            {
                "factor": "Stress Level",
                "importance": round(stress_penalty / total_contribution, 3),
                "description": f"Stress level {data.stress_level}/10 affects hormonal balance",
            },
        ],
        "wellness_score": max(10, 100 - overall_risk + int(np.random.normal(0, 3))),
    }


@router.post("/predict")
async def predict_risk(request: PredictionRequest):
    """Run ML prediction on user health data."""
    result = calculate_risk(request)
    return result


@router.post("/simulate")
async def simulate_risk(request: SimulationRequest):
    """
    Simulate future risk based on lifestyle changes.
    The WOW feature — shows how changes reduce predicted risk.
    """
    base_risk = request.base_prediction.get("risk_score", 58)
    boost = request.activity_boost_percent

    # Simple simulation: each % of activity boost reduces risk
    reduction_factor = boost * 0.7
    simulated_risk = max(10, int(base_risk - reduction_factor))

    return {
        "original_risk": base_risk,
        "simulated_risk": simulated_risk,
        "risk_reduction": base_risk - simulated_risk,
        "activity_boost": boost,
        "message": f"If daily activity improves by {boost}%, predicted risk reduces by {base_risk - simulated_risk}%",
    }
