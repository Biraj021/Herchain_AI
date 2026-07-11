import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  
  // BASIC MEDICAL PROFILE
  age: number | null
  height: number | null
  weight: number | null
  bmi: number | null
  blood_group: string | null
  heart_rate: number | null
  blood_pressure: string | null
  occupation: string | null
  marital_status: string | null

  // LIFESTYLE INFORMATION
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | null
  exercise_frequency: string | null
  sleep_duration: number | null
  sleep_quality: string | null
  smoking: boolean | null
  alcohol: string | null
  stress_level: number | null
  water_intake: string | null
  diet_type: string | null
  junk_food_freq: string | null
  sugar_intake: string | null

  // FAMILY MEDICAL HISTORY
  family_diabetes: boolean | null
  family_obesity: boolean | null
  family_thyroid: boolean | null
  family_pcos: boolean | null
  family_hypertension: boolean | null
  family_heart_disease: boolean | null

  // MENSTRUAL & REPRODUCTIVE HEALTH
  period_start_age: number | null
  cycle_length: number | null
  period_regularity: string | null
  heavy_bleeding: boolean | null
  severe_pain: boolean | null
  missed_periods: boolean | null
  fertility_issues: boolean | null
  num_pregnancies: number | null
  num_deliveries: number | null
  num_miscarriages: number | null
  prev_csection: boolean | null
  contraceptive_use: string | null

  // PREGNANCY INFORMATION
  currently_pregnant: boolean | null
  pregnancy_week: number | null
  due_date: string | null
  first_pregnancy: boolean | null
  multiple_pregnancy: boolean | null
  ivf_pregnancy: boolean | null
  prev_gdm: boolean | null
  prev_complications: string | null
  fetal_movement: string | null
  swelling: boolean | null
  spotting: boolean | null
  abdominal_pain: boolean | null
  severe_headache: boolean | null
  fatigue: string | null
  nausea: string | null

  // PREGNANCY LAB REPORTS
  hemoglobin: number | null
  bp_during_preg: string | null
  fasting_glucose: number | null
  post_meal_glucose: number | null
  hba1c: number | null
  ogtt_result: string | null
  urine_protein: string | null
  thyroid_levels: string | null
  iron_levels: string | null

  // POSTPARTUM INFORMATION
  delivery_type: string | null
  delivery_date: string | null
  delivery_complications: string | null
  baby_weight: number | null
  breastfeeding: boolean | null
  postpartum_bleeding: string | null
  postpartum_depression: boolean | null
  mood_swings: boolean | null
  sleep_problems: boolean | null
  weight_retention: boolean | null

  // MENOPAUSE INFORMATION
  periods_stopped: boolean | null
  menopause_age: number | null
  hot_flashes: boolean | null
  night_sweats: boolean | null
  vaginal_dryness: boolean | null
  bone_pain: boolean | null
  post_menopause_weight: boolean | null

  // OBESITY & METABOLIC HEALTH
  waist_circ: number | null
  hip_circ: number | null
  whr: number | null
  emotional_eating: boolean | null
  binge_eating: boolean | null
  difficulty_losing_weight: boolean | null

  // TYPE 2 DIABETES INFORMATION
  frequent_urination: boolean | null
  excessive_thirst: boolean | null
  slow_healing: boolean | null
  tingling_feet: boolean | null
  cholesterol: number | null
  triglycerides: number | null
  hdl: number | null
  ldl: number | null

  // HORMONAL & METABOLIC DISORDERS
  acne: boolean | null
  hair_fall: boolean | null
  facial_hair: boolean | null
  dark_pigmentation: boolean | null
  tsh: number | null
  t3: number | null
  t4: number | null
  testosterone: number | null
  estrogen: number | null
  cortisol: number | null
  insulin_resistance_score: number | null

  // MENTAL HEALTH INFORMATION
  anxiety_level: number | null
  depression_symptoms: boolean | null
  emotional_stability: number | null
  social_support: number | null
  panic_attacks: boolean | null
  mental_fatigue: boolean | null

  // EMERGENCY / HIGH-RISK SYMPTOMS
  chest_pain: boolean | null
  shortness_breath: boolean | null
  loss_consciousness: boolean | null
  vision_loss: boolean | null
  reduced_fetal_movement: boolean | null
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true })
    // Simulated auth for hackathon demo
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      user: {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        age: null,
        height: null,
        weight: null,
        bmi: null,
        blood_group: null,
        heart_rate: null,
        blood_pressure: null,
        occupation: null,
        marital_status: null,
        activityLevel: null,
        exercise_frequency: null,
        sleep_duration: null,
        sleep_quality: null,
        smoking: null,
        alcohol: null,
        stress_level: null,
        water_intake: null,
        diet_type: null,
        junk_food_freq: null,
        sugar_intake: null,
        family_diabetes: null,
        family_obesity: null,
        family_thyroid: null,
        family_pcos: null,
        family_hypertension: null,
        family_heart_disease: null,
        period_start_age: null,
        cycle_length: null,
        period_regularity: null,
        heavy_bleeding: null,
        severe_pain: null,
        missed_periods: null,
        fertility_issues: null,
        num_pregnancies: null,
        num_deliveries: null,
        num_miscarriages: null,
        prev_csection: null,
        contraceptive_use: null,
        currently_pregnant: null,
        pregnancy_week: null,
        due_date: null,
        first_pregnancy: null,
        multiple_pregnancy: null,
        ivf_pregnancy: null,
        prev_gdm: null,
        prev_complications: null,
        fetal_movement: null,
        swelling: null,
        spotting: null,
        abdominal_pain: null,
        severe_headache: null,
        fatigue: null,
        nausea: null,
        hemoglobin: null,
        bp_during_preg: null,
        fasting_glucose: null,
        post_meal_glucose: null,
        hba1c: null,
        ogtt_result: null,
        urine_protein: null,
        thyroid_levels: null,
        iron_levels: null,
        delivery_type: null,
        delivery_date: null,
        delivery_complications: null,
        baby_weight: null,
        breastfeeding: null,
        postpartum_bleeding: null,
        postpartum_depression: null,
        mood_swings: null,
        sleep_problems: null,
        weight_retention: null,
        periods_stopped: null,
        menopause_age: null,
        hot_flashes: null,
        night_sweats: null,
        vaginal_dryness: null,
        bone_pain: null,
        post_menopause_weight: null,
        waist_circ: null,
        hip_circ: null,
        whr: null,
        emotional_eating: null,
        binge_eating: null,
        difficulty_losing_weight: null,
        frequent_urination: null,
        excessive_thirst: null,
        slow_healing: null,
        tingling_feet: null,
        cholesterol: null,
        triglycerides: null,
        hdl: null,
        ldl: null,
        acne: null,
        hair_fall: null,
        facial_hair: null,
        dark_pigmentation: null,
        tsh: null,
        t3: null,
        t4: null,
        testosterone: null,
        estrogen: null,
        cortisol: null,
        insulin_resistance_score: null,
        anxiety_level: null,
        depression_symptoms: null,
        emotional_stability: null,
        social_support: null,
        panic_attacks: null,
        mental_fatigue: null,
        chest_pain: null,
        shortness_breath: null,
        loss_consciousness: null,
        vision_loss: null,
        reduced_fetal_movement: null,
      },
      isAuthenticated: true,
      isLoading: false,
    })
  },

  signup: async (name: string, email: string, _password: string) => {
    set({ isLoading: true })
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      user: {
        id: 'user_' + Date.now(),
        name,
        email,
        age: null,
        height: null,
        weight: null,
        bmi: null,
        blood_group: null,
        heart_rate: null,
        blood_pressure: null,
        occupation: null,
        marital_status: null,
        activityLevel: null,
        exercise_frequency: null,
        sleep_duration: null,
        sleep_quality: null,
        smoking: null,
        alcohol: null,
        stress_level: null,
        water_intake: null,
        diet_type: null,
        junk_food_freq: null,
        sugar_intake: null,
        family_diabetes: null,
        family_obesity: null,
        family_thyroid: null,
        family_pcos: null,
        family_hypertension: null,
        family_heart_disease: null,
        period_start_age: null,
        cycle_length: null,
        period_regularity: null,
        heavy_bleeding: null,
        severe_pain: null,
        missed_periods: null,
        fertility_issues: null,
        num_pregnancies: null,
        num_deliveries: null,
        num_miscarriages: null,
        prev_csection: null,
        contraceptive_use: null,
        currently_pregnant: null,
        pregnancy_week: null,
        due_date: null,
        first_pregnancy: null,
        multiple_pregnancy: null,
        ivf_pregnancy: null,
        prev_gdm: null,
        prev_complications: null,
        fetal_movement: null,
        swelling: null,
        spotting: null,
        abdominal_pain: null,
        severe_headache: null,
        fatigue: null,
        nausea: null,
        hemoglobin: null,
        bp_during_preg: null,
        fasting_glucose: null,
        post_meal_glucose: null,
        hba1c: null,
        ogtt_result: null,
        urine_protein: null,
        thyroid_levels: null,
        iron_levels: null,
        delivery_type: null,
        delivery_date: null,
        delivery_complications: null,
        baby_weight: null,
        breastfeeding: null,
        postpartum_bleeding: null,
        postpartum_depression: null,
        mood_swings: null,
        sleep_problems: null,
        weight_retention: null,
        periods_stopped: null,
        menopause_age: null,
        hot_flashes: null,
        night_sweats: null,
        vaginal_dryness: null,
        bone_pain: null,
        post_menopause_weight: null,
        waist_circ: null,
        hip_circ: null,
        whr: null,
        emotional_eating: null,
        binge_eating: null,
        difficulty_losing_weight: null,
        frequent_urination: null,
        excessive_thirst: null,
        slow_healing: null,
        tingling_feet: null,
        cholesterol: null,
        triglycerides: null,
        hdl: null,
        ldl: null,
        acne: null,
        hair_fall: null,
        facial_hair: null,
        dark_pigmentation: null,
        tsh: null,
        t3: null,
        t4: null,
        testosterone: null,
        estrogen: null,
        cortisol: null,
        insulin_resistance_score: null,
        anxiety_level: null,
        depression_symptoms: null,
        emotional_stability: null,
        social_support: null,
        panic_attacks: null,
        mental_fatigue: null,
        chest_pain: null,
        shortness_breath: null,
        loss_consciousness: null,
        vision_loss: null,
        reduced_fetal_movement: null,
      },
      isAuthenticated: true,
      isLoading: false,
    })
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  updateProfile: (profile) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null,
    }))
  },
}))
