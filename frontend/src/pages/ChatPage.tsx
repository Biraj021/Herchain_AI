import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useHealthStore, type ChatMessage, type AgentStatus } from '@/store/useHealthStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Send, Sparkles, ChevronRight } from 'lucide-react'
import axios from 'axios'

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
  default: `Based on my analysis, here's what I've found:

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

  // Initial welcome message
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: 'welcome',
        role: 'ai',
        content: `Hello ${user?.name || 'there'}! 👋 I'm your HerChain AI health assistant.\n\nTell me about your symptoms, how you've been feeling, or any health concerns. For example:\n\n*"I feel tired often and gained weight recently"*\n*"I'm 28 weeks pregnant and worried about gestational diabetes"*\n*"Going through menopause and having trouble sleeping"*\n\nI'll coordinate with our team of 7 AI agents to provide comprehensive health insights.`,
        timestamp: new Date(),
        agentName: 'HerChain AI',
      })
    }
  }, [])

  const simulateAgentWorkflow = async (userMessage: string) => {
    setIsAgentProcessing(true)
    setIsTyping(true)

    // Start API call in background while simulating UI
    const apiCall = axios.post('/api/agents/chat', { 
      message: userMessage,
      user_profile: {
        name: user?.name || 'User',
        email: user?.email || 'user@example.com',
      }
    })

    // Run through each agent
    for (let i = 0; i < agentWorkflow.length; i++) {
      const agent = agentWorkflow[i]

      // Update agent statuses
      const newStatuses: AgentStatus[] = agentWorkflow.map((a, j) => ({
        name: a.name,
        icon: a.icon,
        status: j < i ? 'done' : j === i ? 'active' : 'idle',
      }))
      setAgentStatuses(newStatuses)

      // Show agent activity message
      addChatMessage({
        id: `agent-${i}-${Date.now()}`,
        role: 'system',
        content: agent.response,
        timestamp: new Date(),
        agentName: agent.name,
      })

      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600))
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

    // Generate sample health data
    setHealthData({
      wellnessScore: 72,
      riskScore: 58,
      riskLevel: 'Moderate',
      bmiTrends: [
        { week: 'W1', bmi: 24.2 },
        { week: 'W2', bmi: 24.5 },
        { week: 'W3', bmi: 24.8 },
        { week: 'W4', bmi: 24.6 },
        { week: 'W5', bmi: 25.1 },
        { week: 'W6', bmi: 25.3 },
        { week: 'W7', bmi: 25.0 },
        { week: 'W8', bmi: 24.8 },
      ],
      sleepData: [
        { day: 'Mon', hours: 6.5 },
        { day: 'Tue', hours: 7 },
        { day: 'Wed', hours: 5.5 },
        { day: 'Thu', hours: 7.5 },
        { day: 'Fri', hours: 6 },
        { day: 'Sat', hours: 8 },
        { day: 'Sun', hours: 7.5 },
      ],
      activityData: [
        { day: 'Mon', steps: 4200 },
        { day: 'Tue', steps: 6800 },
        { day: 'Wed', steps: 3100 },
        { day: 'Thu', steps: 7500 },
        { day: 'Fri', steps: 5200 },
        { day: 'Sat', steps: 8900 },
        { day: 'Sun', steps: 6100 },
      ],
      riskBreakdown: {
        obesity: 62,
        gdm: 45,
        t2d: 58,
        hormonal: 35,
        cardiovascular: 28,
      },
      recommendations: {
        nutrition: [
          'Increase daily water intake to 2.5 liters',
          'Add iron-rich foods like spinach and lentils',
          'Reduce processed sugar intake by 30%',
          'Include omega-3 sources daily',
          'Eat 5 small meals instead of 3 large ones',
        ],
        fitness: [
          '20-minute prenatal low-impact walking daily',
          'Gentle yoga stretches for 15 minutes',
          'Pelvic floor exercises 3x per day',
          'Light swimming 2x per week',
          'Breathing exercises before bed',
        ],
        emotional: [
          'Morning meditation for 5 minutes',
          'Gratitude journaling before sleep',
          'Connect with support groups weekly',
          'Practice mindful eating',
          'Limit screen time before bed',
        ],
      },
      contributingFactors: [
        'Elevated BMI (25.3) above healthy range',
        'Low sleep quality (avg 6.8 hrs)',
        'Below recommended daily activity',
        'Moderate stress indicators',
        'Family history consideration',
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
                    <div className={`agent-status-dot ${agent.status}`} />
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
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
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

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-xs text-text-dim py-1"
      >
        <div className="agent-status-dot active" />
        <span className="font-medium text-primary-light">{message.agentName}</span>
        <span>{message.content}</span>
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
        <div className="text-sm whitespace-pre-wrap leading-relaxed">
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
      </div>
    </motion.div>
  )
}
