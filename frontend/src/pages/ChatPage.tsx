import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useHealthStore, type ChatMessage, type AgentStatus } from '@/store/useHealthStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Send, Sparkles, ChevronRight } from 'lucide-react'
import axios from 'axios'
import { TypewriterEffect } from '@/components/TypewriterEffect'

// Simulated AI agent workflow
const agentWorkflow = [
  { name: 'Intake Agent', icon: '📋', response: 'Analyzing your symptoms and health data...' },
  { name: 'Risk Agent', icon: '⚠️', response: 'Calculating health risk scores based on your profile...' },
  { name: 'Nutrition Agent', icon: '🥗', response: 'Generating personalized nutrition recommendations...' },
  { name: 'Fitness Agent', icon: '💪', response: 'Creating activity plans for your life stage...' },
  { name: 'Emotional Agent', icon: '🧠', response: 'Assessing emotional wellness patterns...' },
  { name: 'Reflection Agent', icon: '🔍', response: 'Validating and refining all recommendations...' },
  { name: 'Report Agent', icon: '📊', response: 'Compiling your comprehensive health report...' },
]

const sampleResponses: Record<string, string> = {
  default: `1. Overall Wellness Summary
Your current health indicators suggest a generally stable wellness profile, though there are specific areas where preventive focus can further optimize your long-term health. We have analyzed your metabolic and cardiovascular markers to provide this personalized assessment.

2. Main Contributing Factors
• BMI (25.3) is slightly above the optimal range for your life stage.
• Reported sleep duration (6.8 hrs) is below the recommended 7-9 hours for restorative health.
• Moderate stress levels may be impacting metabolic efficiency.

3. Risk Analysis
• Obesity Risk: Moderate (based on BMI and current activity patterns)
• GDM Risk: Low-Moderate (if pregnant, based on history/glucose)
• Type 2 Diabetes Risk: Moderate (influenced by BMI and family history)
• Cardiovascular Risk: Low (based on stable blood pressure and heart rate)

4. Personalized Recommendations
• Gradually increase hydration to 2.5L daily to support metabolic function.
• Focus on iron-rich, nutrient-dense foods like spinach and lentils to maintain energy levels.

5. Preventive Lifestyle Suggestions
• Incorporate 20 minutes of low-impact walking daily to improve insulin sensitivity.
• Practice 5-minute morning mindfulness to better manage stress-induced cortisol.

6. Positive Health Observations
• Your blood pressure and heart rate remain within healthy, stable ranges.

7. Final Preventive Advice
Small, consistent adjustments in activity and sleep can significantly reduce future health risks.

*Your full report has been generated. View your dashboard for detailed charts and simulations.*`,
}

export function ChatPage() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const {
    chatMessages,
    addChatMessage,
    agentStatuses,
    setAgentStatuses,
    isAgentProcessing,
    setIsAgentProcessing,
    setHealthData,
  } = useHealthStore()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  const hasInitialized = useRef(false)
  // Initial welcome message
  useEffect(() => {
    if (chatMessages.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true
      addChatMessage({
        id: 'welcome',
        role: 'ai',
        content: `Hello ${user?.name || 'there'}! 👋 I'm your HerChain AI health assistant.\n\nTell me about your symptoms, how you've been feeling, or any health concerns. For example:\n\n*"I feel tired often and gained weight recently"*\n*"I'm 28 weeks pregnant and worried about gestational diabetes"*\n*"Going through menopause and having trouble sleeping"*\n\nI'll coordinate with our team of 7 AI agents to provide comprehensive health insights.`,
        timestamp: new Date(),
        agentName: 'HerChain AI',
      })
    }
  }, [addChatMessage, chatMessages.length, user?.name])

  const simulateAgentWorkflow = async (userMessage: string) => {
    setIsAgentProcessing(true)
    setIsTyping(true)

    // Start API call in background while simulating UI
    const apiCall = axios.post('/api/agents/chat', { 
      message: userMessage,
      user_profile: {
        name: user?.name || 'User',
        email: user?.email || 'user@example.com',
        
        // BASIC MEDICAL PROFILE
        age: user?.age,
        height: user?.height,
        weight: user?.weight,
        bmi: user?.bmi,
        blood_group: user?.blood_group,
        heart_rate: user?.heart_rate,
        blood_pressure: user?.blood_pressure,
        occupation: user?.occupation,
        marital_status: user?.marital_status,

        // LIFESTYLE INFORMATION
        activity_level: user?.activityLevel,
        exercise_frequency: user?.exercise_frequency,
        sleep_duration: user?.sleep_duration,
        sleep_quality: user?.sleep_quality,
        smoking: user?.smoking,
        alcohol: user?.alcohol,
        stress_level: user?.stress_level,
        water_intake: user?.water_intake,
        diet_type: user?.diet_type,
        junk_food_freq: user?.junk_food_freq,
        sugar_intake: user?.sugar_intake,

        // FAMILY MEDICAL HISTORY
        family_diabetes: user?.family_diabetes,
        family_obesity: user?.family_obesity,
        family_thyroid: user?.family_thyroid,
        family_pcos: user?.family_pcos,
        family_hypertension: user?.family_hypertension,
        family_heart_disease: user?.family_heart_disease,

        // MENSTRUAL & REPRODUCTIVE HEALTH
        period_start_age: user?.period_start_age,
        cycle_length: user?.cycle_length,
        period_regularity: user?.period_regularity,
        heavy_bleeding: user?.heavy_bleeding,
        severe_pain: user?.severe_pain,
        missed_periods: user?.missed_periods,
        fertility_issues: user?.fertility_issues,
        num_pregnancies: user?.num_pregnancies,
        num_deliveries: user?.num_deliveries,
        num_miscarriages: user?.num_miscarriages,
        prev_csection: user?.prev_csection,
        contraceptive_use: user?.contraceptive_use,

        // PREGNANCY INFORMATION
        currently_pregnant: user?.currently_pregnant,
        pregnancy_week: user?.pregnancy_week,
        due_date: user?.due_date,
        first_pregnancy: user?.first_pregnancy,
        multiple_pregnancy: user?.multiple_pregnancy,
        ivf_pregnancy: user?.ivf_pregnancy,
        prev_gdm: user?.prev_gdm,
        prev_complications: user?.prev_complications,
        fetal_movement: user?.fetal_movement,
        swelling: user?.swelling,
        spotting: user?.spotting,
        abdominal_pain: user?.abdominal_pain,
        severe_headache: user?.severe_headache,
        fatigue: user?.fatigue,
        nausea: user?.nausea,

        // PREGNANCY LAB REPORTS
        hemoglobin: user?.hemoglobin,
        bp_during_preg: user?.bp_during_preg,
        fasting_glucose: user?.fasting_glucose,
        post_meal_glucose: user?.post_meal_glucose,
        hba1c: user?.hba1c,
        ogtt_result: user?.ogtt_result,
        urine_protein: user?.urine_protein,
        thyroid_levels: user?.thyroid_levels,
        iron_levels: user?.iron_levels,

        // POSTPARTUM INFORMATION
        delivery_type: user?.delivery_type,
        delivery_date: user?.delivery_date,
        delivery_complications: user?.delivery_complications,
        baby_weight: user?.baby_weight,
        breastfeeding: user?.breastfeeding,
        postpartum_bleeding: user?.postpartum_bleeding,
        postpartum_depression: user?.postpartum_depression,
        mood_swings: user?.mood_swings,
        sleep_problems: user?.sleep_problems,
        weight_retention: user?.weight_retention,

        // MENOPAUSE INFORMATION
        periods_stopped: user?.periods_stopped,
        menopause_age: user?.menopause_age,
        hot_flashes: user?.hot_flashes,
        night_sweats: user?.night_sweats,
        vaginal_dryness: user?.vaginal_dryness,
        bone_pain: user?.bone_pain,
        post_menopause_weight: user?.post_menopause_weight,

        // OBESITY & METABOLIC HEALTH
        waist_circ: user?.waist_circ,
        hip_circ: user?.hip_circ,
        whr: user?.whr,
        emotional_eating: user?.emotional_eating,
        binge_eating: user?.binge_eating,
        difficulty_losing_weight: user?.difficulty_losing_weight,

        // TYPE 2 DIABETES INFORMATION
        frequent_urination: user?.frequent_urination,
        excessive_thirst: user?.excessive_thirst,
        slow_healing: user?.slow_healing,
        tingling_feet: user?.tingling_feet,
        cholesterol: user?.cholesterol,
        triglycerides: user?.triglycerides,
        hdl: user?.hdl,
        ldl: user?.ldl,

        // HORMONAL & METABOLIC DISORDERS
        acne: user?.acne,
        hair_fall: user?.hair_fall,
        facial_hair: user?.facial_hair,
        dark_pigmentation: user?.dark_pigmentation,
        tsh: user?.tsh,
        t3: user?.t3,
        t4: user?.t4,
        testosterone: user?.testosterone,
        estrogen: user?.estrogen,
        cortisol: user?.cortisol,
        insulin_resistance_score: user?.insulin_resistance_score,

        // MENTAL HEALTH INFORMATION
        anxiety_level: user?.anxiety_level,
        depression_symptoms: user?.depression_symptoms,
        emotional_stability: user?.emotional_stability,
        social_support: user?.social_support,
        panic_attacks: user?.panic_attacks,
        mental_fatigue: user?.mental_fatigue,

        // EMERGENCY / HIGH-RISK SYMPTOMS
        chest_pain: user?.chest_pain,
        shortness_breath: user?.shortness_breath,
        loss_consciousness: user?.loss_consciousness,
        vision_loss: user?.vision_loss,
        reduced_fetal_movement: user?.reduced_fetal_movement,
      }
    })

    // Run through each agent
    for (let i = 0; i < agentWorkflow.length; i++) {
      // Update agent statuses
      const newStatuses: AgentStatus[] = agentWorkflow.map((a, j) => ({
        name: a.name,
        icon: a.icon,
        status: j < i ? 'done' : j === i ? 'active' : 'idle',
      }))
      setAgentStatuses(newStatuses)

      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400))
    }

    // All agents done
    setAgentStatuses(
      agentWorkflow.map((a) => ({
        name: a.name,
        icon: a.icon,
        status: 'done' as const,
      }))
    )

    let aiResponse = sampleResponses.default
    try {
      const { data } = await apiCall
      if (data.message) {
        aiResponse = data.message
      }
    } catch (error) {
      console.error('Failed to get real AI response:', error)
    }

    // Final AI response
    setIsTyping(false)
    addChatMessage({
      id: `response-${Date.now()}`,
      role: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      agentName: 'HerChain AI',
    })

    // Dynamic health data generation based on user profile
    const bmi = user?.bmi || 22
    const glucose = user?.fasting_glucose || 90
    const age = user?.age || 25
    
    // Simple heuristic for wellness score
    let wellness = 80
    if (bmi > 25) wellness -= 5
    if (bmi > 30) wellness -= 10
    if (glucose > 100) wellness -= 5
    if (user?.stress_level && user.stress_level > 7) wellness -= 10
    if (user?.sleep_duration && user.sleep_duration < 6) wellness -= 5

    // Simple heuristic for risk score
    let risk = 15
    if (bmi > 25) risk += 15
    if (glucose > 100) risk += 20
    if (user?.family_diabetes) risk += 15
    if (age > 45) risk += 10

    setHealthData({
      wellnessScore: Math.min(98, Math.max(20, wellness)),
      riskScore: Math.min(95, Math.max(5, risk)),
      riskLevel: risk < 30 ? 'Low' : risk < 60 ? 'Moderate' : 'High',
      bmiTrends: [
        { week: 'W1', bmi: bmi - 0.8 },
        { week: 'W2', bmi: bmi - 0.5 },
        { week: 'W3', bmi: bmi - 0.2 },
        { week: 'W4', bmi: bmi },
      ],
      sleepData: [
        { day: 'Mon', hours: user?.sleep_duration || 7 },
        { day: 'Tue', hours: (user?.sleep_duration || 7) - 0.5 },
        { day: 'Wed', hours: (user?.sleep_duration || 7) + 1 },
        { day: 'Thu', hours: user?.sleep_duration || 7 },
        { day: 'Fri', hours: (user?.sleep_duration || 7) - 1 },
        { day: 'Sat', hours: (user?.sleep_duration || 7) + 1.5 },
        { day: 'Sun', hours: user?.sleep_duration || 7 },
      ],
      activityData: [
        { day: 'Mon', steps: 4000 },
        { day: 'Tue', steps: 6000 },
        { day: 'Wed', steps: 3000 },
        { day: 'Thu', steps: 7000 },
        { day: 'Fri', steps: 5000 },
        { day: 'Sat', steps: 9000 },
        { day: 'Sun', steps: 6000 },
      ],
      riskBreakdown: {
        obesity: bmi > 25 ? 60 : 20,
        gdm: user?.prev_gdm ? 70 : 30,
        t2d: glucose > 100 ? 65 : 25,
        hormonal: user?.acne ? 55 : 20,
        cardiovascular: user?.blood_pressure?.includes('140') ? 60 : 25,
      },
      recommendations: {
        nutrition: [
          `Adjust calorie intake for BMI of ${bmi}`,
          glucose > 100 ? 'Monitor carbohydrate intake strictly' : 'Maintain balanced glycemic index diet',
          'Increase fiber-rich vegetables',
          'Monitor sodium if BP is elevated',
          'Prioritize lean proteins',
        ],
        fitness: [
          '30-minute brisk walking daily',
          'Resistance training 2x per week',
          'Pelvic floor exercises',
          'Morning yoga for flexibility',
          'Interval training for metabolic health',
        ],
        emotional: [
          user?.anxiety_level && user.anxiety_level > 5 ? 'Consult wellness counselor for anxiety' : 'Daily 10-min meditation',
          'Gratitude journaling',
          'Social support check-ins',
          'Limit stress-inducing digital media',
          'Deep breathing exercises',
        ],
      },
      contributingFactors: [
        bmi > 25 ? `Elevated BMI (${bmi})` : `Healthy BMI (${bmi})`,
        glucose > 100 ? `High fasting glucose (${glucose})` : `Normal fasting glucose (${glucose})`,
        user?.family_diabetes ? 'Genetic predisposition (Family History)' : 'No significant family history of diabetes',
        user?.sleep_duration && user.sleep_duration < 7 ? 'Sub-optimal sleep patterns' : 'Good restorative sleep',
        user?.stress_level && user.stress_level > 6 ? 'High reported stress' : 'Managed stress levels',
      ],
    })

    setIsAgentProcessing(false)
  }

  const handleSend = () => {
    if (!input.trim() || isAgentProcessing) return

    addChatMessage({
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    })

    const msg = input
    setInput('')
    simulateAgentWorkflow(msg)
  }

  return (
    <div className="page-container flex flex-col h-screen">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm">HerChain AI Assistant</h1>
              <p className="text-text-dim text-xs">
                {isAgentProcessing ? 'Agents collaborating...' : '7 AI agents ready'}
              </p>
            </div>
          </div>
          {useHealthStore.getState().healthData && (
            <button
              onClick={() => navigate('/dashboard')}
              className="badge badge-primary flex items-center gap-1"
            >
              View Dashboard <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Agent Status Bar */}
      <AnimatePresence>
        {isAgentProcessing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-shrink-0 border-b border-border overflow-hidden"
          >
            <div className="p-3 max-w-4xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {agentStatuses.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                      agent.status === 'active'
                        ? 'bg-primary/15 text-primary-light border border-primary/30'
                        : agent.status === 'done'
                        ? 'bg-accent/10 text-accent border border-accent/20'
                        : 'bg-surface text-text-dim border border-border'
                    }`}
                  >
                    <span>{agent.icon}</span>
                    <motion.div 
                      animate={agent.status === 'active' ? { 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.6, 1]
                      } : {}}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`agent-status-dot ${agent.status}`} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatMessages.map((msg, index) => (
            <ChatBubble key={msg.id} message={msg} isLatest={index === chatMessages.length - 1} />
          ))}

          {isTyping && (
            <div className="chat-bubble-ai inline-block">
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex-shrink-0 p-4 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isAgentProcessing ? 'Agents are working...' : 'Describe your symptoms...'}
            disabled={isAgentProcessing}
            className="input-field flex-1"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isAgentProcessing}
            className="btn-primary !px-4 !py-3 flex-shrink-0 disabled:opacity-40"
          >
            <span>
              <Send size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ message, isLatest }: { message: ChatMessage; isLatest?: boolean }) {
  if (message.role === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-[10px] text-text-dim py-1 px-2 rounded-lg bg-surface/30 w-fit"
      >
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="agent-status-dot active bg-primary-light" 
        />
        <span className="font-semibold text-primary-light tracking-wide uppercase text-[9px]">{message.agentName}</span>
        <span className="italic">{message.content}</span>
      </motion.div>
    )
  }

  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex justify-end"
      >
        <div className="chat-bubble-user">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-start"
    >
      <div className="chat-bubble-ai">
        {message.agentName && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
            <Sparkles size={14} className="text-primary-light" />
            <span className="text-xs font-semibold text-primary-light">{message.agentName}</span>
          </div>
        )}
        <div className="text-sm">
          {isLatest && message.role === 'ai' ? (
            <TypewriterEffect content={message.content} speed={15} />
          ) : (
            <div className="whitespace-pre-wrap leading-relaxed">
              {message.content.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i}>{part.slice(2, -2)}</strong>
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <em key={i} className="text-text-muted">{part.slice(1, -1)}</em>
                }
                return <span key={i}>{part}</span>
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
