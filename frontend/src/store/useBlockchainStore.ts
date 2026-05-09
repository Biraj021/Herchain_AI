import { create } from 'zustand'

export interface BlockchainRecord {
  reportHash: string
  transactionHash: string
  blockNumber: number
  timestamp: string
  contractAddress: string
  verified: boolean
  reportType: string
}

interface BlockchainState {
  records: BlockchainRecord[]
  currentVerification: BlockchainRecord | null
  isVerifying: boolean
  addRecord: (record: BlockchainRecord) => void
  setCurrentVerification: (record: BlockchainRecord | null) => void
  setIsVerifying: (val: boolean) => void
  verifyReport: (hash: string) => Promise<BlockchainRecord>
}

export const useBlockchainStore = create<BlockchainState>((set, get) => ({
  records: [],
  currentVerification: null,
  isVerifying: false,

  addRecord: (record) => set((state) => ({
    records: [...state.records, record]
  })),

  setCurrentVerification: (record) => set({ currentVerification: record }),

  setIsVerifying: (val) => set({ isVerifying: val }),

  verifyReport: async (hash: string) => {
    set({ isVerifying: true })
    // Simulated blockchain verification
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const record: BlockchainRecord = {
      reportHash: hash || '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      blockNumber: 45_000_000 + Math.floor(Math.random() * 1_000_000),
      timestamp: new Date().toISOString(),
      contractAddress: '0x7a23...HerChain',
      verified: true,
      reportType: 'AI Health Assessment Report',
    }

    set((state) => ({
      records: [...state.records, record],
      currentVerification: record,
      isVerifying: false,
    }))

    return record
  },
}))
