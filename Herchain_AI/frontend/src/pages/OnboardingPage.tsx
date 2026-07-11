import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

const lifeStages = [
  { id: 'pregnancy' as const, emoji: '🤰', title: 'Pregnancy', desc: 'Track GDM risk, nutrition, prenatal wellness' },
  { id: 'postpartum' as const, emoji: '🍼', title: 'Postpartum', desc: 'Recovery, mental health, weight management' },
  { id: 'menopause' as const, emoji: '🌸', title: 'Menopause', desc: 'Hormonal balance, bone health, vitality' },
  { id: 'wellness' as const, emoji: '💪', title: 'General Wellness', desc: 'Preventive care, fitness, metabolic health' },
]

const activityLevels = [
  { id: 'sedentary' as const, label: 'Sedentary', desc: 'Little to no exercise' },
  { id: 'light' as const, label: 'Light', desc: '1-2 days/week' },
  { id: 'moderate' as const, label: 'Moderate', desc: '3-5 days/week' },
  { id: 'active' as const, label: 'Active', desc: '6-7 days/week' },
]

export function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedStage, setSelectedStage] = useState<typeof lifeStages[0]['id'] | null>(null)
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState<typeof activityLevels[0]['id'] | null>(null)
  
  // New clinical fields
  // BASIC MEDICAL PROFILE
  const [bloodGroup, setBloodGroup] = useState('')
  const [occupation, setOccupation] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')

  // LIFESTYLE
  const [exerciseFreq, setExerciseFreq] = useState('')
  const [sleep, setSleep] = useState('7')
  const [sleepQuality, setSleepQuality] = useState('')
  const [smoking, setSmoking] = useState(false)
  const [alcohol, setAlcohol] = useState('')
  const [stress, setStress] = useState('5')
  const [waterIntake, setWaterIntake] = useState('')
  const [dietType, setDietType] = useState('')
  const [sugarIntake, setSugarIntake] = useState('')

  // FAMILY HISTORY
  const [famDiabetes, setFamDiabetes] = useState(false)
  const [famObesity, setFamObesity] = useState(false)
  const [famThyroid, setFamThyroid] = useState(false)
  const [famPcos, setFamPcos] = useState(false)
  const [famHypertension, setFamHypertension] = useState(false)

  // REPRODUCTIVE
  const [cycleLength, setCycleLength] = useState('')
  const [periodRegularity, setPeriodRegularity] = useState('')
  const [numPregnancies, setNumPregnancies] = useState('')
  const [numDeliveries, setNumDeliveries] = useState('')

  // PREGNANCY
  const [currentlyPregnant, setCurrentlyPregnant] = useState(false)
  const [pregWeek, setPregWeek] = useState('')
  const [prevGdm, setPrevGdm] = useState(false)
  const [fetalMovement, setFetalMovement] = useState('Normal')

  // LAB REPORTS
  const [hemoglobin, setHemoglobin] = useState('')
  const [glucose, setGlucose] = useState('')
  const [hba1c, setHba1c] = useState('')
  const [bp, setBp] = useState('')

  // HORMONAL
  const [acne, setAcne] = useState(false)
  const [hairFall, setHairFall] = useState(false)
  const [tsh, setTsh] = useState('')

  // MENTAL HEALTH
  const [anxiety, setAnxiety] = useState('3')
  const [socialSupport, setSocialSupport] = useState('7')

  // EMERGENCY
  const [chestPain, setChestPain] = useState(false)
  const [shortnessBreath, setShortnessBreath] = useState(false)

  const [clinicalCategory, setClinicalCategory] = useState('basic')

  const navigate = useNavigate()
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const user = useAuthStore((s) => s.user)

  const handleComplete = () => {
    updateProfile({
      age: parseInt(age) || null,
      weight: parseFloat(weight) || null,
      height: parseFloat(height) || null,
      activityLevel: activity,
      bmi: weight && height ? parseFloat((parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1)) : null,
      
      blood_group: bloodGroup || null,
      occupation: occupation || null,
      marital_status: maritalStatus || null,

      exercise_frequency: exerciseFreq || null,
      sleep_duration: parseFloat(sleep) || null,
      sleep_quality: sleepQuality || null,
      smoking: smoking,
      alcohol: alcohol || null,
      stress_level: parseInt(stress) || null,
      water_intake: waterIntake || null,
      diet_type: dietType || null,
      sugar_intake: sugarIntake || null,

      family_diabetes: famDiabetes,
      family_obesity: famObesity,
      family_thyroid: famThyroid,
      family_pcos: famPcos,
      family_hypertension: famHypertension,

      cycle_length: parseInt(cycleLength) || null,
      period_regularity: periodRegularity || null,
      num_pregnancies: parseInt(numPregnancies) || null,
      num_deliveries: parseInt(numDeliveries) || null,

      currently_pregnant: currentlyPregnant,
      pregnancy_week: parseInt(pregWeek) || null,
      prev_gdm: prevGdm,
      fetal_movement: fetalMovement,

      hemoglobin: parseFloat(hemoglobin) || null,
      fasting_glucose: parseFloat(glucose) || null,
      hba1c: parseFloat(hba1c) || null,
      blood_pressure: bp || null,

      acne: acne,
      hair_fall: hairFall,
      tsh: parseFloat(tsh) || null,

      anxiety_level: parseInt(anxiety) || null,
      social_support: parseInt(socialSupport) || null,

      chest_pain: chestPain,
      shortness_breath: shortnessBreath,
    })
    navigate('/chat')
  }

  const canProceed =
    step === 0
      ? true
      : step === 1
      ? selectedStage !== null
      : step === 2
      ? age && weight && height && activity && 
        parseInt(age) >= 13 && parseInt(age) <= 110 &&
        parseInt(weight) >= 30 && parseInt(weight) <= 300 &&
        parseInt(height) >= 100 && parseInt(height) <= 250
      : step === 3
      ? true // Clinical data optional
      : false

  const totalSteps = 4

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-6">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full mx-1 transition-all duration-500 ${
                i <= step ? 'gradient-primary' : 'bg-surface-lighter'
              }`}
            />
          ))}
        </div>
        <p className="text-text-dim text-xs text-right">
          Step {step + 1} of {totalSteps}
        </p>
      </div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-6"
              >
                👋
              </motion.div>
              <h1 className="text-3xl font-bold mb-3">
                Welcome, <span className="gradient-primary-text">{user?.name || 'there'}</span>!
              </h1>
              <p className="text-text-muted mb-8">
                Let's personalize your wellness experience. We'll ask a few questions to
                understand your health goals.
              </p>
              <div className="glass-card p-6 text-left space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-accent">✓</span>
                  <span className="text-text-muted">Takes less than 2 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-accent">✓</span>
                  <span className="text-text-muted">All data stays private</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-accent">✓</span>
                  <span className="text-text-muted">Customize your AI agents</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Life Stage */}
          {step === 1 && (
            <motion.div
              key="stage"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-center">What describes you best?</h2>
              <p className="text-text-muted text-sm mb-8 text-center">
                Select your current life stage for personalized care
              </p>
              <div className="grid grid-cols-2 gap-4">
                {lifeStages.map((stage) => (
                  <motion.button
                    key={stage.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStage(stage.id)}
                    type="button"
                    className={`glass-card p-5 text-center transition-all select-none cursor-pointer relative overflow-hidden ${
                      selectedStage === stage.id
                        ? 'border-primary glow-primary ring-1 ring-primary/50'
                        : 'hover:border-white/20'
                    }`}
                  >
                    <div className="relative z-10 pointer-events-none">
                      <div className="text-3xl mb-2">{stage.emoji}</div>
                      <h3 className="font-bold text-sm mb-1">{stage.title}</h3>
                      <p className="text-text-dim text-xs">{stage.desc}</p>
                    </div>
                    {selectedStage === stage.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2 inline-flex items-center justify-center w-6 h-6 rounded-full gradient-primary"
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Health Profile */}
          {step === 2 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-center">Quick Health Profile</h2>
              <p className="text-text-muted text-sm mb-8 text-center">
                This helps our AI give more accurate predictions
              </p>
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-text-muted block mb-2">Age</label>
                    <input
                      type="number"
                      min="13"
                      max="110"
                      value={age}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 110)) {
                          setAge(val);
                        }
                      }}
                      placeholder="28"
                      className="input-field text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      min="30"
                      max="250"
                      value={weight}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 300)) {
                          setWeight(val);
                        }
                      }}
                      placeholder="65"
                      className="input-field text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-2">Height (cm)</label>
                    <input
                      type="number"
                      min="100"
                      max="250"
                      value={height}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 250)) {
                          setHeight(val);
                        }
                      }}
                      placeholder="165"
                      className="input-field text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-text-muted block mb-3">Activity Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activityLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setActivity(level.id)}
                        className={`glass-card p-4 text-left transition-all ${
                          activity === level.id
                            ? 'border-primary glow-primary'
                            : 'hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold text-sm">{level.label}</div>
                        <div className="text-text-dim text-xs">{level.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Clinical Data (Optional) */}
          {step === 3 && (
            <motion.div
              key="clinical"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-xl font-bold mb-1 text-center text-white">Medical Deep Dive</h2>
              <p className="text-text-muted text-[11px] mb-5 text-center">
                Detailed data enables hyper-accurate AI health simulation
              </p>
              
              <div className="flex gap-4 h-[400px]">
                {/* Category Sidebar */}
                <div className="w-[140px] flex flex-col gap-1.5 overflow-y-auto pr-1 custom-scrollbar shrink-0">
                  {[
                    { id: 'basic', label: 'Basic', icon: '📋' },
                    { id: 'lifestyle', label: 'Lifestyle', icon: '🥗' },
                    { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
                    { id: 'reproductive', label: 'Periods', icon: '🌸' },
                    { id: 'pregnancy', label: 'Pregnancy', icon: '🤰' },
                    { id: 'labs', label: 'Labs', icon: '🧪' },
                    { id: 'hormonal', label: 'Hormonal', icon: '🧬' },
                    { id: 'mental', label: 'Mental', icon: '🧠' },
                    { id: 'emergency', label: 'High Risk', icon: '🚨' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setClinicalCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all border text-left ${
                        clinicalCategory === cat.id
                          ? 'bg-primary/20 border-primary text-primary-light shadow-[0_0_15px_rgba(225,29,116,0.15)]'
                          : 'bg-surface/40 border-border text-text-dim hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Fields Area */}
                <div className="flex-1 bg-surface/30 rounded-2xl border border-border p-4 overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={clinicalCategory}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {clinicalCategory === 'basic' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Blood Group</label>
                            <input value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} placeholder="O+" className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Occupation</label>
                            <input value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Software Engineer" className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Marital Status</label>
                            <input value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} placeholder="Married" className="input-field !py-2" />
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'lifestyle' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Sleep Duration (Hrs)</label>
                            <input type="number" min="0" max="24" value={sleep} onChange={e => setSleep(e.target.value)} className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Sugar Intake</label>
                            <input value={sugarIntake} onChange={e => setSugarIntake(e.target.value)} placeholder="Low / High" className="input-field !py-2" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={smoking} onChange={e => setSmoking(e.target.checked)} className="accent-primary" />
                            <label className="text-[11px] text-text-muted">Currently Smoking</label>
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'family' && (
                        <div className="space-y-2">
                          {[
                            { label: 'Diabetes', val: famDiabetes, set: setFamDiabetes },
                            { label: 'Obesity', val: famObesity, set: setFamObesity },
                            { label: 'Thyroid', val: famThyroid, set: setFamThyroid },
                            { label: 'PCOS', val: famPcos, set: setFamPcos },
                            { label: 'Hypertension', val: famHypertension, set: setFamHypertension },
                          ].map(item => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => item.set(!item.val)}
                              className={`w-full px-3 py-2 rounded-lg text-left text-[11px] border transition-all ${
                                item.val ? 'bg-primary/10 border-primary/50 text-primary-light' : 'bg-surface border-border text-text-dim'
                              }`}
                            >
                              Family History of {item.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {clinicalCategory === 'reproductive' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Cycle Length (Days)</label>
                            <input type="number" min="15" max="50" value={cycleLength} onChange={e => setCycleLength(e.target.value)} placeholder="28" className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Period Regularity</label>
                            <input value={periodRegularity} onChange={e => setPeriodRegularity(e.target.value)} placeholder="Regular/Irregular" className="input-field !py-2" />
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'pregnancy' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <input type="checkbox" checked={currentlyPregnant} onChange={e => setCurrentlyPregnant(e.target.checked)} className="accent-primary" />
                            <label className="text-[11px] font-bold text-primary-light">Currently Pregnant</label>
                          </div>
                          {currentlyPregnant && (
                            <div>
                              <label className="text-[10px] uppercase text-text-dim block mb-1">Pregnancy Week</label>
                              <input type="number" min="1" max="42" value={pregWeek} onChange={e => setPregWeek(e.target.value)} placeholder="24" className="input-field !py-2" />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={prevGdm} onChange={e => setPrevGdm(e.target.checked)} className="accent-primary" />
                            <label className="text-[11px] text-text-muted">Previous GDM History</label>
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'labs' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Glucose (Fasting)</label>
                            <input type="number" min="40" max="600" value={glucose} onChange={e => setGlucose(e.target.value)} className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">HbA1c (%)</label>
                            <input type="number" min="3" max="15" step="0.1" value={hba1c} onChange={e => setHba1c(e.target.value)} className="input-field !py-2" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Blood Pressure</label>
                            <input value={bp} onChange={e => setBp(e.target.value)} placeholder="120/80" className="input-field !py-2" />
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'hormonal' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">TSH Level</label>
                            <input type="number" min="0.1" max="100" step="0.1" value={tsh} onChange={e => setTsh(e.target.value)} className="input-field !py-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={acne} onChange={e => setAcne(e.target.checked)} className="accent-primary" />
                              <label className="text-[11px] text-text-muted">Persistent Acne</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={hairFall} onChange={e => setHairFall(e.target.checked)} className="accent-primary" />
                              <label className="text-[11px] text-text-muted">Excessive Hair Fall</label>
                            </div>
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'mental' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Anxiety Level (1-10)</label>
                            <input type="range" min="1" max="10" value={anxiety} onChange={e => setAnxiety(e.target.value)} className="w-full accent-primary" />
                            <div className="flex justify-between text-[9px] text-text-dim px-1"><span>Low</span><span>High</span></div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-text-dim block mb-1">Social Support (1-10)</label>
                            <input type="range" min="1" max="10" value={socialSupport} onChange={e => setSocialSupport(e.target.value)} className="w-full accent-primary" />
                            <div className="flex justify-between text-[9px] text-text-dim px-1"><span>None</span><span>Strong</span></div>
                          </div>
                        </div>
                      )}

                      {clinicalCategory === 'emergency' && (
                        <div className="space-y-3">
                          <p className="text-[10px] text-accent font-bold mb-2 uppercase tracking-tight">⚠️ Mark if experiencing now</p>
                          {[
                            { label: 'Chest Pain', val: chestPain, set: setChestPain },
                            { label: 'Shortness of Breath', val: shortnessBreath, set: setShortnessBreath },
                          ].map(item => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => item.set(!item.val)}
                              className={`w-full px-3 py-3 rounded-xl text-left text-xs font-bold border transition-all ${
                                item.val ? 'bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(255,59,48,0.2)]' : 'bg-surface border-border text-text-dim'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => {
              console.log('Continue clicked, current step:', step);
              if (step < totalSteps - 1) {
                setStep(s => s + 1)
              } else {
                handleComplete()
              }
            }}
            disabled={!canProceed}
            className={`btn-primary flex items-center gap-2 ${
              !canProceed ? 'opacity-40 cursor-not-allowed grayscale-[0.5]' : 'active:scale-95'
            }`}
          >
            <span className="flex items-center gap-2 pointer-events-none">
              {step === totalSteps - 1 ? 'Start AI Chat' : 'Continue'}
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
