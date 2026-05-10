import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useHealthStore } from '@/store/useHealthStore'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  CartesianGrid,
} from 'recharts'
import {
  Heart,
  AlertTriangle,
  TrendingUp,
  Moon,
  Footprints,
  Sparkles,
  Shield,
  ArrowRight,
  Salad,
  Dumbbell,
  Brain,
  ChevronRight,
  Flame,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
}

export function DashboardPage() {
  const navigate = useNavigate()
  const healthData = useHealthStore((s) => s.healthData)
  const [activityBoost, setActivityBoost] = useState(0)

  if (!healthData) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="text-5xl mb-4"
          >
            🤖
          </motion.div>
          <h2 className="text-xl font-bold mb-2">No Health Data Yet</h2>
          <p className="text-text-muted text-sm mb-6">
            Chat with our AI first to generate your health report
          </p>
          <button onClick={() => navigate('/chat')} className="btn-primary">
            <span className="flex items-center gap-2">
              Start AI Chat <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    )
  }

  const {
    wellnessScore,
    riskScore,
    riskLevel,
    bmiTrends,
    sleepData,
    activityData,
    riskBreakdown,
    recommendations,
    contributingFactors,
  } = healthData

  const simulatedRisk = Math.max(10, riskScore - activityBoost * 1.75)

  const radarData = [
    { subject: 'Obesity', value: riskBreakdown.obesity },
    { subject: 'GDM', value: riskBreakdown.gdm },
    { subject: 'T2D', value: riskBreakdown.t2d },
    { subject: 'Hormonal', value: riskBreakdown.hormonal },
    { subject: 'CVD', value: riskBreakdown.cardiovascular },
  ]

  const wellnessRingData = [
    { name: 'score', value: wellnessScore, fill: 'url(#wellnessGradient)' },
  ]

  return (
    <div className="page-container pb-24">
      <div className="page-content py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold">Health Dashboard</h1>
            <p className="text-text-dim text-sm">Your AI-generated wellness insights</p>
          </div>
          <button
            onClick={() => navigate('/blockchain')}
            className="badge badge-success flex items-center gap-1"
          >
            <Shield size={12} /> Verify <ChevronRight size={12} />
          </button>
        </motion.div>

        {/* Top Row: Wellness Score + Risk Score */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Wellness Score */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="dashboard-card flex flex-col items-center"
          >
            <h3 className="text-xs font-semibold text-text-muted mb-3 flex items-center gap-1.5">
              <Heart size={12} className="text-primary" /> Wellness Score
            </h3>
            <div className="score-ring">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="75%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={90 - (wellnessScore / 100) * 360}
                  data={wellnessRingData}
                >
                  <defs>
                    <linearGradient id="wellnessGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E11D74" />
                      <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                  </defs>
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="score-ring-value">
                <span className="text-3xl font-bold gradient-primary-text leading-none">{wellnessScore}</span>
                <span className="text-[10px] text-text-dim leading-tight">/ 100</span>
              </div>
            </div>
          </motion.div>

          {/* Risk Score */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="dashboard-card flex flex-col items-center"
          >
            <h3 className="text-xs font-semibold text-text-muted mb-3 flex items-center gap-1.5">
              <AlertTriangle size={12} className="text-warning" /> Risk Score
            </h3>
            <div className="score-ring">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="75%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={90 - (riskScore / 100) * 360}
                  data={[{ name: 'risk', value: riskScore, fill: 'url(#riskGradient)' }]}
                >
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="score-ring-value">
                <span className="text-3xl font-bold text-warning leading-none">{riskScore}</span>
                <span className={`text-[10px] font-semibold leading-tight ${
                  riskLevel === 'Low' ? 'text-success' : riskLevel === 'Moderate' ? 'text-warning' : 'text-danger'
                }`}>
                  {riskLevel}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="dashboard-card"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Flame size={16} className="text-primary" />
              Risk Breakdown
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#E11D74"
                    fill="#E11D74"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="dashboard-card"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-accent" />
              BMI Trends
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bmiTrends}>
                  <defs>
                    <linearGradient id="bmiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#1A1A2E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="bmi"
                    stroke="#14B8A6"
                    strokeWidth={2}
                    fill="url(#bmiGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Sleep & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="dashboard-card"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Moon size={16} className="text-secondary-light" /> Sleep
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                  <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#1A1A2E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="hours" fill="#9333EA" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={5}
            className="dashboard-card"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Footprints size={16} className="text-accent" /> Activity
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#1A1A2E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="steps" fill="#14B8A6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Contributing Factors & Future Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={6}
            className="dashboard-card"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-primary-light" />
              Explainable AI — Key Factors
            </h3>
            <div className="space-y-3">
              {contributingFactors.map((factor, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-muted">{factor}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={7}
            className="dashboard-card border-primary/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-primary text-[10px]">✨ WOW Feature</span>
            </div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              🔮 Future Risk Simulation
            </h3>
            <p className="text-text-dim text-xs mb-5">
              See how lifestyle changes today can reduce your future health risks
            </p>

            {/* Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-text-muted mb-2">
                <span>Increase daily activity by:</span>
                <span className="font-bold text-accent">{activityBoost}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={activityBoost}
                onChange={(e) => setActivityBoost(parseInt(e.target.value))}
                className="w-full accent-primary h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #E11D74 ${activityBoost * 2}%, rgba(255,255,255,0.1) ${activityBoost * 2}%)`,
                }}
              />
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <p className="text-xs text-text-dim mb-1">Current Risk</p>
                <p className="text-2xl font-bold text-warning">{riskScore}%</p>
              </div>
              <div className="glass-card p-4 text-center border-accent/30">
                <p className="text-xs text-text-dim mb-1">Projected Risk</p>
                <motion.p
                  key={simulatedRisk}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-accent"
                >
                  {Math.round(simulatedRisk)}%
                </motion.p>
              </div>
            </div>

            {activityBoost > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20"
              >
                <p className="text-xs text-accent font-medium">
                  🎯 If daily activity improves by {activityBoost}%, predicted T2D risk reduces by{' '}
                  <strong>{Math.round(riskScore - simulatedRisk)}%</strong>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={8}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary-light" />
            Personalized Recommendations
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RecommendationCard
              icon={<Salad size={18} />}
              title="Nutrition Plan"
              color="accent"
              items={recommendations.nutrition}
            />
            <RecommendationCard
              icon={<Dumbbell size={18} />}
              title="Fitness Plan"
              color="primary"
              items={recommendations.fitness}
            />
            <RecommendationCard
              icon={<Brain size={18} />}
              title="Emotional Wellness"
              color="secondary"
              items={recommendations.emotional}
            />
          </div>
        </motion.div>

        {/* CTA: Verify on Blockchain */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={9}
          className="dashboard-card gradient-primary text-center"
        >
          <Shield size={28} className="text-white/80 mx-auto mb-3" />
          <h3 className="font-bold text-white mb-1">Verify Your Report</h3>
          <p className="text-white/70 text-xs mb-4">
            Store your health report hash on the Polygon blockchain
          </p>
          <button
            onClick={() => navigate('/blockchain')}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              Verify on Blockchain <ArrowRight size={16} />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function RecommendationCard({
  icon,
  title,
  color,
  items,
}: {
  icon: React.ReactNode
  title: string
  color: 'accent' | 'primary' | 'secondary'
  items: string[]
}) {
  const colorMap = {
    accent: 'bg-accent/10 text-accent border-accent/20',
    primary: 'bg-primary/10 text-primary-light border-primary/20',
    secondary: 'bg-secondary/10 text-secondary-light border-secondary/20',
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className={`text-xs mt-1 ${
              color === 'accent' ? 'text-accent' : color === 'primary' ? 'text-primary-light' : 'text-secondary-light'
            }`}>
              •
            </span>
            <p className="text-sm text-text-muted">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
