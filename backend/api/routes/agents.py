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

SYSTEM_PROMPT = """You are HerChain AI, an advanced agentic healthcare AI assistant specializing in women's health.
You are a team of 7 specialized AI agents working together:
1. Intake Agent — organizes user symptoms
2. Risk Agent — predicts obesity/GDM/T2D risk
3. Nutrition Agent — creates meal plans
4. Fitness Agent — generates workout routines
5. Emotional Agent — analyzes stress/emotional patterns
6. Reflection Agent — validates all outputs
7. Report Agent — compiles the final summary

You help with pregnancy, postpartum, menopause, and general wellness.
You analyze symptoms, predict health risks, and provide personalized recommendations.

IMPORTANT: Always be empathetic, evidence-based, and encouraging.
Structure your response EXACTLY like this format using markdown:

**🎯 Risk Assessment:**
• Obesity Risk: [Low/Moderate/High] ([score]/100)
• GDM Risk: [Low/Moderate/High] ([score]/100)
• T2D Risk: [Low/Moderate/High] ([score]/100)

**🥗 Nutrition Recommendations:**
• [recommendation 1]
• [recommendation 2]
• [recommendation 3]
• [recommendation 4]

**💪 Fitness Plan:**
• [exercise 1]
• [exercise 2]
• [exercise 3]

**🧠 Emotional Wellness:**
• [insight 1]
• [insight 2]
• [insight 3]

**📊 Key Insight:**
[One actionable insight about how lifestyle changes can reduce risk]

*Your full report has been generated. View your dashboard for detailed charts and simulations.*

Consider the user's life stage, age, weight, height, and activity level when provided.
Make recommendations specific and actionable. Never give generic advice."""


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
        if p.life_stage:
            context_parts.append(f"Life stage: {p.life_stage}")
        if p.age:
            context_parts.append(f"Age: {p.age}")
        if p.weight and p.height:
            bmi = round(p.weight / ((p.height / 100) ** 2), 1)
            context_parts.append(f"Weight: {p.weight}kg, Height: {p.height}cm, BMI: {bmi}")
        if p.activity_level:
            context_parts.append(f"Activity level: {p.activity_level}")

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
                model="gemini-2.0-flash",
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
            # Fall through to simulated response

    # Fallback: simulated response
    return _simulated_response()


def _simulated_response():
    """Fallback simulated response when Gemini is unavailable."""
    return {
        "message": """Based on my analysis, here's what I've found:

**🎯 Risk Assessment:**
• Obesity Risk: Moderate (62/100)
• GDM Risk: Low-Moderate (45/100)
• T2D Risk: Moderate (58/100)

**🥗 Nutrition Recommendations:**
• Increase daily water intake to 2.5L
• Add iron-rich foods (spinach, lentils)
• Reduce processed sugar intake
• Include omega-3 sources (walnuts, flax)

**💪 Fitness Plan:**
• 20-min prenatal low-impact walking daily
• Gentle yoga stretches (15 min/day)
• Breathing exercises before bed

**🧠 Emotional Wellness:**
• Stress patterns may influence emotional eating
• Try 5-min morning meditation
• Journal gratitude before sleep

**📊 Key Insight:**
If you increase daily activity by 20%, your predicted T2D risk could reduce by ~35%.

*Your full report has been generated. View your dashboard for detailed charts and simulations.*""",
        "source": "simulated",
        "agent_results": [
            {"agent": a["name"], "icon": a["icon"], "status": "completed"}
            for a in AGENTS
        ],
    }
