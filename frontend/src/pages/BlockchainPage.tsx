import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchainStore } from '@/store/useBlockchainStore'
import { useHealthStore } from '@/store/useHealthStore'
import {
  Shield,
  CheckCircle2,
  Hash,
  Clock,
  FileText,
  ExternalLink,
  Loader2,
  Blocks,
  Lock,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react'

export function BlockchainPage() {
  const healthData = useHealthStore((s) => s.healthData)
  const { currentVerification, isVerifying, verifyReport, records } = useBlockchainStore()
  const [step, setStep] = useState(0) // 0: ready, 1: processing, 2: verified
  const [copied, setCopied] = useState<string | null>(null)

  const handleVerify = async () => {
    if (!healthData) return
    setStep(1)

    // Generate hash from health data
    const dataString = JSON.stringify(healthData)
    const encoder = new TextEncoder()
    const data = encoder.encode(dataString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    await verifyReport(hash)
    setStep(2)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="page-container pb-24">
      <div className="page-content py-6 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold mb-1">Blockchain Verification</h1>
          <p className="text-text-dim text-sm">Immutable, tamper-proof health records</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 0: Ready to verify */}
          {step === 0 && !currentVerification && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Explanation Card */}
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                    <Lock size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">How It Works</h3>
                    <p className="text-text-dim text-xs">Privacy-preserving verification</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: '📊',
                      title: 'Report Generated',
                      desc: 'AI creates your health assessment report',
                    },
                    {
                      icon: '#️⃣',
                      title: 'Hash Created',
                      desc: 'SHA-256 cryptographic hash of your report',
                    },
                    {
                      icon: '⛓️',
                      title: 'Stored on Polygon',
                      desc: 'Only the hash is stored — never your data',
                    },
                    {
                      icon: '✅',
                      title: 'Verification Badge',
                      desc: 'Proves report authenticity and timestamp',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center flex-shrink-0 text-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-text-dim text-xs">{item.desc}</p>
                      </div>
                      {i < 3 && (
                        <div className="absolute ml-3.5 mt-8 w-px h-4 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* What we DON'T store */}
              <div className="glass-card p-5 mb-6 border-danger/20">
                <h4 className="text-xs font-bold text-danger mb-3">❌ NEVER Stored on Chain</h4>
                <div className="flex flex-wrap gap-2">
                  {['Medical records', 'Personal health data', 'Your name', 'Lab results'].map(
                    (item) => (
                      <span key={item} className="badge badge-danger text-[10px]">
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* What we DO store */}
              <div className="glass-card p-5 mb-8 border-success/20">
                <h4 className="text-xs font-bold text-success mb-3">✅ ONLY Stored on Chain</h4>
                <div className="flex flex-wrap gap-2">
                  {['Report hash', 'Timestamp', 'Verification ID'].map((item) => (
                    <span key={item} className="badge badge-success text-[10px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!healthData}
                className={`btn-primary w-full py-4 text-lg ${
                  !healthData ? 'opacity-40 cursor-not-allowed' : 'animate-pulse-glow'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Shield size={22} />
                  {healthData ? 'Verify My Report on Blockchain' : 'Generate Report First (Chat)'}
                </span>
              </button>
            </motion.div>
          )}

          {/* Step 1: Processing */}
          {step === 1 && isVerifying && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 rounded-full border-4 border-accent/20 border-t-accent flex items-center justify-center">
                  <Blocks size={32} className="text-accent" />
                </div>
              </motion.div>

              <h3 className="text-xl font-bold mb-2">Storing on Blockchain...</h3>
              <p className="text-text-muted text-sm mb-8">
                Creating cryptographic hash and storing on Polygon
              </p>

              {/* Animated steps */}
              <div className="space-y-3 max-w-xs mx-auto text-left">
                {[
                  'Generating SHA-256 hash...',
                  'Connecting to Polygon network...',
                  'Submitting transaction...',
                  'Waiting for confirmation...',
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.6 + 0.3 }}
                    >
                      <CheckCircle2 size={16} className="text-accent" />
                    </motion.div>
                    <span className="text-sm text-text-muted">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Verified */}
          {step === 2 && currentVerification && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Verified Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-center mb-8"
              >
                <div className="verified-badge inline-flex mx-auto mb-4">
                  <CheckCircle2 size={48} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold gradient-accent-text mb-1">
                  Report Verified!
                </h2>
                <p className="text-text-muted text-sm">
                  Immutably stored on the Polygon blockchain
                </p>
              </motion.div>

              {/* Verification Details */}
              <div className="space-y-3 mb-6">
                <VerificationRow
                  icon={<FileText size={16} />}
                  label="Report Type"
                  value={currentVerification.reportType}
                  copyable={false}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <VerificationRow
                  icon={<Hash size={16} />}
                  label="Report Hash"
                  value={currentVerification.reportHash}
                  copyable
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <VerificationRow
                  icon={<Blocks size={16} />}
                  label="Transaction Hash"
                  value={currentVerification.transactionHash}
                  copyable
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <VerificationRow
                  icon={<Hash size={16} />}
                  label="Block Number"
                  value={`#${currentVerification.blockNumber.toLocaleString()}`}
                  copyable={false}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <VerificationRow
                  icon={<Clock size={16} />}
                  label="Timestamp"
                  value={new Date(currentVerification.timestamp).toLocaleString()}
                  copyable={false}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <VerificationRow
                  icon={<Lock size={16} />}
                  label="Contract"
                  value={currentVerification.contractAddress}
                  copyable
                  copied={copied}
                  onCopy={copyToClipboard}
                />
              </div>

              {/* View on PolygonScan */}
              <a
                href={`https://amoy.polygonscan.com/tx/${currentVerification.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between mb-4 hover:border-accent/30 transition-all block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ExternalLink size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">View on PolygonScan</p>
                    <p className="text-text-dim text-xs">Verify independently on the explorer</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-text-dim" />
              </a>

              {/* Verify Another */}
              <button
                onClick={() => {
                  setStep(0)
                }}
                className="btn-secondary w-full py-3"
              >
                Verify Another Report
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previous Records */}
        {records.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-text-muted mb-3">Previous Verifications</h3>
            <div className="space-y-2">
              {records.slice(0, -1).reverse().map((record, i) => (
                <div key={i} className="glass-card p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-accent" />
                    <div>
                      <p className="text-xs font-medium">
                        {record.reportHash.slice(0, 10)}...{record.reportHash.slice(-6)}
                      </p>
                      <p className="text-[10px] text-text-dim">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-success text-[10px]">Verified</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function VerificationRow({
  icon,
  label,
  value,
  copyable,
  copied,
  onCopy,
}: {
  icon: React.ReactNode
  label: string
  value: string
  copyable: boolean
  copied: string | null
  onCopy: (text: string, label: string) => void
}) {
  const displayValue =
    value.length > 30 ? `${value.slice(0, 14)}...${value.slice(-10)}` : value

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="text-text-dim flex-shrink-0">{icon}</div>
          <div className="min-w-0">
            <p className="text-[10px] text-text-dim uppercase tracking-wider">{label}</p>
            <p className="text-sm font-mono font-medium truncate">{displayValue}</p>
          </div>
        </div>
        {copyable && (
          <button
            onClick={() => onCopy(value, label)}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-surface-lighter transition-colors"
          >
            {copied === label ? (
              <Check size={14} className="text-accent" />
            ) : (
              <Copy size={14} className="text-text-dim" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
