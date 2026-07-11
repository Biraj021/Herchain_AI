import os
import json
from fastapi import APIRouter
from api.schemas import ChatRequest

router = APIRouter()

# Agent definitions
AGENTS = [
    {
        "name": "Intake Agent",
        "role": "Health Data Organizer",
        "goal": "Parse and organize user symptoms into structured health data",
        "icon": "📋",
    },
    {
        "name": "Risk Agent",
        "role": "Risk Predictor",
        "goal": "Calculate obesity, GDM, and T2D risk scores",
        "icon": "⚠️",
    },
    {
        "name": "Nutrition Agent",
        "role": "Nutrition Advisor",
        "goal": "Generate personalized meal and nutrition recommendations",
        "icon": "🥗",
    },
    {
        "name": "Fitness Agent",
        "role": "Fitness Coach",
        "goal": "Create activity and exercise plans for the life stage",
        "icon": "💪",
    },
    {
        "name": "Emotional Agent",
        "role": "Wellness Counselor",
        "goal": "Analyze stress patterns and emotional wellness indicators",
        "icon": "🧠",
    },
    {
        "name": "Reflection Agent",
        "role": "Quality Validator",
        "goal": "Validate and refine all agent outputs for accuracy",
        "icon": "🔍",
    },
    {
        "name": "Report Agent",
        "role": "Report Generator",
        "goal": "Compile final comprehensive health report",
        "icon": "📊",
    },
]

SYSTEM_PROMPT = """You are an advanced women’s healthcare AI assistant for HerChain AI.
Your task is to generate a medically logical, realistic, personalized wellness summary based ONLY on the provided user health parameters and ML prediction outputs.

IMPORTANT RULES:
* Do NOT exaggerate risks.
* Do NOT create dangerous medical conclusions or unrealistic "miracle" scores.
* All numerical risk scores must be between 5% and 95% (never 0% or 100%).
* Follow clinical reasonability: A single abnormal value (e.g., one slightly high glucose reading) should not result in a "High" risk unless other factors correlate.
* Use cautious, healthcare-safe language.
* Age alone should NEVER strongly increase diabetes or GDM risk.
* Give higher importance to glucose, BMI, blood pressure, pregnancy history, family history, and lifestyle indicators.
* Tone should be supportive, professional, and trustworthy.

Structure your response EXACTLY in this format using markdown:

1. Overall Wellness Summary
[Provide a supportive and professional overview]

2. Main Contributing Factors
• [Factor 1]
• [Factor 2]

3. Risk Analysis
• Obesity Risk: [Low/Moderate/High] (based on BMI/Lifestyle)
• GDM Risk: [Low/Moderate/High] (if pregnant, based on history/glucose)
• Type 2 Diabetes Risk: [Low/Moderate/High] (based on glucose/family history)
• Cardiovascular Risk: [Low/Moderate/High] (based on BP/Activity)

4. Personalized Recommendations
• [Recommendation 1]
• [Recommendation 2]

5. Preventive Lifestyle Suggestions
• [Suggestion 1]
• [Suggestion 2]

6. Positive Health Observations
• [Observation 1]

7. Final Preventive Advice
[Brief closing note]

*Your full report has been generated. View your dashboard for detailed charts and simulations.*"""


@router.get("/list")
async def list_agents():
    """List all available AI agents."""
    return {"agents": AGENTS}


@router.post("/chat")
async def chat_with_agents(request: ChatRequest):
    """
    Process a user message through the AI agent workflow.
    Uses Gemini API if GOOGLE_API_KEY is set, otherwise falls back to simulated responses.
    """
    api_key = os.getenv("GOOGLE_API_KEY")

    # Build context from user profile
    context_parts = []
    if request.user_profile:
        p = request.user_profile
        
        sections = {
            "BASIC MEDICAL": {
                "Age": p.age, "Height": p.height, "Weight": p.weight, "BMI": p.bmi,
                "Blood Group": p.blood_group, "Heart Rate": p.heart_rate, "Blood Pressure": p.blood_pressure,
                "Occupation": p.occupation, "Marital Status": p.marital_status
            },
            "LIFESTYLE": {
                "Activity Level": p.activity_level, "Exercise Freq": p.exercise_frequency,
                "Sleep": p.sleep_duration, "Sleep Quality": p.sleep_quality,
                "Smoking": p.smoking, "Alcohol": p.alcohol, "Stress": p.stress_level,
                "Water Intake": p.water_intake, "Diet": p.diet_type, "Sugar Intake": p.sugar_intake
            },
            "FAMILY HISTORY": {
                "Diabetes": p.family_diabetes, "Obesity": p.family_obesity, "Thyroid": p.family_thyroid,
                "PCOS": p.family_pcos, "Hypertension": p.family_hypertension, "Heart Disease": p.family_heart_disease
            },
            "REPRODUCTIVE HEALTH": {
                "Cycle Length": p.cycle_length, "Regularity": p.period_regularity,
                "Heavy Bleeding": p.heavy_bleeding, "Severe Pain": p.severe_pain,
                "Pregnancies": p.num_pregnancies, "Deliveries": p.num_deliveries
            },
            "PREGNANCY INFO": {
                "Pregnant": p.currently_pregnant, "Week": p.pregnancy_week, "Due Date": p.due_date,
                "Prev GDM": p.prev_gdm, "Fetal Movement": p.fetal_movement, "Swelling": p.swelling
            },
            "LAB REPORTS": {
                "Hemoglobin": p.hemoglobin, "Fasting Glucose": p.fasting_glucose,
                "Post Meal Glucose": p.post_meal_glucose, "HbA1c": p.hba1c, "Thyroid": p.thyroid_levels
            },
            "POSTPARTUM": {
                "Delivery Type": p.delivery_type, "Postpartum Depression": p.postpartum_depression,
                "Breastfeeding": p.breastfeeding, "Mood Swings": p.mood_swings
            },
            "MENOPAUSE": {
                "Periods Stopped": p.periods_stopped, "Hot Flashes": p.hot_flashes,
                "Night Sweats": p.night_sweats, "Bone Pain": p.bone_pain
            },
            "METABOLIC & DIABETES": {
                "Waist Circ": p.waist_circ, "WHR": p.whr, "Thirst": p.excessive_thirst,
                "Urination": p.frequent_urination, "Cholesterol": p.cholesterol
            },
            "HORMONAL": {
                "Acne": p.acne, "Hair Fall": p.hair_fall, "Testosterone": p.testosterone,
                "Estrogen": p.estrogen, "TSH": p.tsh, "Insulin Resistance": p.insulin_resistance_score
            },
            "MENTAL HEALTH": {
                "Anxiety": p.anxiety_level, "Depression Symptoms": p.depression_symptoms,
                "Stability": p.emotional_stability, "Social Support": p.social_support
            },
            "EMERGENCY/HIGH RISK": {
                "Chest Pain": p.chest_pain, "Shortness of Breath": p.shortness_breath,
                "Loss of Consciousness": p.loss_consciousness, "Vision Loss": p.vision_loss
            }
        }

        for section_name, fields in sections.items():
            valid_fields = [f"{k}: {v}" for k, v in fields.items() if v is not None]
            if valid_fields:
                context_parts.append(f"\n[{section_name}]")
                context_parts.extend(valid_fields)

    profile_context = "\n".join(context_parts) if context_parts else "No profile data provided."

    # Try Gemini first
    if api_key:
        try:
            from google import genai

            client = genai.Client(api_key=api_key)

            full_prompt = f"""{SYSTEM_PROMPT}

User Profile:
{profile_context}

User Message: {request.message}"""

            response = client.models.generate_content(
                model="gemini-1.5-flash",  # Using 1.5-flash for better stability across regions
                contents=full_prompt,
            )

            ai_message = response.text

            return {
                "message": ai_message,
                "source": "gemini",
                "agent_results": [
                    {"agent": a["name"], "icon": a["icon"], "status": "completed"}
                    for a in AGENTS
                ],
            }
        except Exception as e:
            print(f"Gemini API error: {e}")
            # Fall through to dynamic simulated response
            return _simulated_response(request)

    # Fallback: simulated response
    return _simulated_response(request)


def _simulated_response(request: ChatRequest):
    """Dynamic simulated response based on user profile."""
    name = request.user_profile.name if request.user_profile else "User"
    age = request.user_profile.age if request.user_profile else "N/A"
    bmi = request.user_profile.bmi if request.user_profile else "N/A"
    
    return {
        "message": f"""1. Overall Wellness Summary
Hello {name}, based on your profile (Age: {age}, BMI: {bmi}), our AI agents have analyzed your health markers. While this is a simulation, it reflects your provided data to identify potential focus areas for your wellness.

2. Main Contributing Factors
• Age and lifestyle indicators suggest a focus on metabolic health is appropriate.
• Physical activity level and sleep quality are primary drivers of your current wellness score.

3. Risk Analysis
• Obesity Risk: {"Moderate" if (bmi and float(bmi) > 25) else "Low"} (based on your BMI of {bmi})
• GDM/Diabetes Risk: Moderate (preventive monitoring recommended based on profile)
• Cardiovascular Risk: Stable (monitored via current heart rate data)

4. Personalized Recommendations
• Maintain consistent hydration to support metabolic efficiency.
• Consider nutrient-dense meal planning tailored to your {age} age group.

5. Preventive Lifestyle Suggestions
• Aim for 7.5 hours of quality sleep to improve cognitive and physical recovery.
• Incorporate gentle daily movement to stabilize glucose levels.

6. Positive Health Observations
• Your proactive engagement in health tracking is a significant positive indicator.

7. Final Preventive Advice
Small, data-driven changes lead to the most sustainable health outcomes.

*Your full report has been generated. View your dashboard for detailed charts and simulations.*""",
        "source": "simulated",
        "agent_results": [
            {"agent": a["name"], "icon": a["icon"], "status": "completed"}
            for a in AGENTS
        ],
    }
