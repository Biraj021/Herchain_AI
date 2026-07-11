from pydantic import BaseModel
from typing import Optional


class UserProfile(BaseModel):
    name: str
    email: str
    
    # BASIC MEDICAL PROFILE
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    bmi: Optional[float] = None
    blood_group: Optional[str] = None
    heart_rate: Optional[int] = None
    blood_pressure: Optional[str] = None
    occupation: Optional[str] = None
    marital_status: Optional[str] = None

    # LIFESTYLE INFORMATION
    activity_level: Optional[str] = None
    exercise_frequency: Optional[str] = None
    sleep_duration: Optional[float] = None
    sleep_quality: Optional[str] = None
    smoking: Optional[bool] = None
    alcohol: Optional[str] = None
    stress_level: Optional[int] = None
    water_intake: Optional[str] = None
    diet_type: Optional[str] = None
    junk_food_freq: Optional[str] = None
    sugar_intake: Optional[str] = None

    # FAMILY MEDICAL HISTORY
    family_diabetes: Optional[bool] = None
    family_obesity: Optional[bool] = None
    family_thyroid: Optional[bool] = None
    family_pcos: Optional[bool] = None
    family_hypertension: Optional[bool] = None
    family_heart_disease: Optional[bool] = None

    # MENSTRUAL & REPRODUCTIVE HEALTH
    period_start_age: Optional[int] = None
    cycle_length: Optional[int] = None
    period_regularity: Optional[str] = None
    heavy_bleeding: Optional[bool] = None
    severe_pain: Optional[bool] = None
    missed_periods: Optional[bool] = None
    fertility_issues: Optional[bool] = None
    num_pregnancies: Optional[int] = None
    num_deliveries: Optional[int] = None
    num_miscarriages: Optional[int] = None
    prev_csection: Optional[bool] = None
    contraceptive_use: Optional[str] = None

    # PREGNANCY INFORMATION
    currently_pregnant: Optional[bool] = None
    pregnancy_week: Optional[int] = None
    due_date: Optional[str] = None
    first_pregnancy: Optional[bool] = None
    multiple_pregnancy: Optional[bool] = None
    ivf_pregnancy: Optional[bool] = None
    prev_gdm: Optional[bool] = None
    prev_complications: Optional[str] = None
    fetal_movement: Optional[str] = None
    swelling: Optional[bool] = None
    spotting: Optional[bool] = None
    abdominal_pain: Optional[bool] = None
    severe_headache: Optional[bool] = None
    fatigue: Optional[str] = None
    nausea: Optional[str] = None

    # PREGNANCY LAB REPORTS
    hemoglobin: Optional[float] = None
    bp_during_preg: Optional[str] = None
    fasting_glucose: Optional[float] = None
    post_meal_glucose: Optional[float] = None
    hba1c: Optional[float] = None
    ogtt_result: Optional[str] = None
    urine_protein: Optional[str] = None
    thyroid_levels: Optional[str] = None
    iron_levels: Optional[str] = None

    # POSTPARTUM INFORMATION
    delivery_type: Optional[str] = None
    delivery_date: Optional[str] = None
    delivery_complications: Optional[str] = None
    baby_weight: Optional[float] = None
    breastfeeding: Optional[bool] = None
    postpartum_bleeding: Optional[str] = None
    postpartum_depression: Optional[bool] = None
    mood_swings: Optional[bool] = None
    sleep_problems: Optional[bool] = None
    weight_retention: Optional[bool] = None

    # MENOPAUSE INFORMATION
    periods_stopped: Optional[bool] = None
    menopause_age: Optional[int] = None
    hot_flashes: Optional[bool] = None
    night_sweats: Optional[bool] = None
    vaginal_dryness: Optional[bool] = None
    bone_pain: Optional[bool] = None
    post_menopause_weight: Optional[bool] = None

    # OBESITY & METABOLIC HEALTH
    waist_circ: Optional[float] = None
    hip_circ: Optional[float] = None
    whr: Optional[float] = None
    emotional_eating: Optional[bool] = None
    binge_eating: Optional[bool] = None
    difficulty_losing_weight: Optional[bool] = None

    # TYPE 2 DIABETES INFORMATION
    frequent_urination: Optional[bool] = None
    excessive_thirst: Optional[bool] = None
    slow_healing: Optional[bool] = None
    tingling_feet: Optional[bool] = None
    cholesterol: Optional[float] = None
    triglycerides: Optional[float] = None
    hdl: Optional[float] = None
    ldl: Optional[float] = None

    # HORMONAL & METABOLIC DISORDERS
    acne: Optional[bool] = None
    hair_fall: Optional[bool] = None
    facial_hair: Optional[bool] = None
    dark_pigmentation: Optional[bool] = None
    tsh: Optional[float] = None
    t3: Optional[float] = None
    t4: Optional[float] = None
    testosterone: Optional[float] = None
    estrogen: Optional[float] = None
    cortisol: Optional[float] = None
    insulin_resistance_score: Optional[float] = None

    # MENTAL HEALTH INFORMATION
    anxiety_level: Optional[int] = None
    depression_symptoms: Optional[bool] = None
    emotional_stability: Optional[int] = None
    social_support: Optional[int] = None
    panic_attacks: Optional[bool] = None
    mental_fatigue: Optional[bool] = None

    # EMERGENCY / HIGH-RISK SYMPTOMS
    chest_pain: Optional[bool] = None
    shortness_breath: Optional[bool] = None
    loss_consciousness: Optional[bool] = None
    vision_loss: Optional[bool] = None
    reduced_fetal_movement: Optional[bool] = None


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
