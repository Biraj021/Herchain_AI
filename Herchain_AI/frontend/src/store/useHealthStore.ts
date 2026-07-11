import { create } from 'zustand'

export interface HealthData {
  wellnessScore: number
  riskScore: number
  riskLevel: 'Low' | 'Moderate' | 'High'
  bmiTrends: { week: string; bmi: number }[]
  sleepData: { day: string; hours: number }[]
  activityData: { day: string; steps: number }[]
  riskBreakdown: {
    obesity: number
    gdm: number
    t2d: number
    hormonal: number
    cardiovascular: number
  }
  recommendations: {
    nutrition: string[]
    fitness: string[]
    emotional: string[]
  }
  contributingFactors: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  agentName?: string
}

export interface AgentStatus {
  name: string
  status: 'idle' | 'active' | 'done'
  icon: string
}

interface HealthState {
  healthData: HealthData | null
  chatMessages: ChatMessage[]
  agentStatuses: AgentStatus[]
  isAgentProcessing: boolean
  simulatedRisk: number | null
  setHealthData: (data: HealthData) => void
  addChatMessage: (msg: ChatMessage) => void
  setChatMessages: (msgs: ChatMessage[]) => void
  setAgentStatuses: (statuses: AgentStatus[]) => void
  setIsAgentProcessing: (val: boolean) => void
  setSimulatedRisk: (val: number | null) => void
}

const defaultAgents: AgentStatus[] = [
  { name: 'Intake Agent', status: 'idle', icon: '📋' },
  { name: 'Risk Agent', status: 'idle', icon: '⚠️' },
  { name: 'Nutrition Agent', status: 'idle', icon: '🥗' },
  { name: 'Fitness Agent', status: 'idle', icon: '💪' },
  { name: 'Emotional Agent', status: 'idle', icon: '🧠' },
  { name: 'Reflection Agent', status: 'idle', icon: '🔍' },
  { name: 'Report Agent', status: 'idle', icon: '📊' },
]

export const useHealthStore = create<HealthState>((set) => ({
  healthData: null,
  chatMessages: [],
  agentStatuses: defaultAgents,
  isAgentProcessing: false,
  simulatedRisk: null,

  setHealthData: (data) => set({ healthData: data }),
  addChatMessage: (msg) => set((state) => ({
    chatMessages: [...state.chatMessages, msg]
  })),
  setChatMessages: (msgs) => set({ chatMessages: msgs }),
  setAgentStatuses: (statuses) => set({ agentStatuses: statuses }),
  setIsAgentProcessing: (val) => set({ isAgentProcessing: val }),
  setSimulatedRisk: (val) => set({ simulatedRisk: val }),
}))
