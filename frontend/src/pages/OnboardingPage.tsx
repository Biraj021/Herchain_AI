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
  const navigate = useNavigate()
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const user = useAuthStore((s) => s.user)

  const handleComplete = () => {
    updateProfile({
      lifeStage: selectedStage,
      age: parseInt(age) || null,
      weight: parseFloat(weight) || null,
      height: parseFloat(height) || null,
      activityLevel: activity,
    })
    navigate('/chat')
  }

  const canProceed =
    step === 0
      ? true
      : step === 1
      ? selectedStage !== null
      : step === 2
      ? age && weight && height && activity
      : false

  const totalSteps = 3

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
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="28"
                      className="input-field text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="65"
                      className="input-field text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
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
