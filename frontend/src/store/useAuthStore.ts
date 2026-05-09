import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  lifeStage: 'pregnancy' | 'postpartum' | 'menopause' | 'wellness' | null
  age: number | null
  weight: number | null
  height: number | null
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | null
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
        lifeStage: null,
        age: null,
        weight: null,
        height: null,
        activityLevel: null,
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
        lifeStage: null,
        age: null,
        weight: null,
        height: null,
        activityLevel: null,
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
