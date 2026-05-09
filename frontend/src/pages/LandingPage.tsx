import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  Shield,
  Heart,
  Activity,
  Sparkles,
  ArrowRight,
  Bot,
  LineChart,
  Lock,
  ChevronRight,
  Zap,
  Star,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(225,29,116,0.12) 0%, transparent 70%)',
              top: '10%',
              left: '-5%',
            }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
              bottom: '5%',
              right: '-10%',
            }}
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
              top: '40%',
              right: '20%',
            }}
            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { Icon: Heart, top: '15%', left: '10%', delay: 0 },
            { Icon: Activity, top: '25%', right: '15%', delay: 1 },
            { Icon: Brain, bottom: '30%', left: '8%', delay: 2 },
            { Icon: Shield, bottom: '20%', right: '10%', delay: 0.5 },
            { Icon: Sparkles, top: '40%', left: '25%', delay: 1.5 },
          ].map(({ Icon, delay, ...pos }, idx) => (
            <motion.div
              key={idx}
              className="absolute text-white/5"
              style={pos as any}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={40} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="badge badge-primary text-sm px-4 py-1.5">
              <Sparkles size={14} />
              AI-Powered Women's Healthcare
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="gradient-primary-text">HerChain</span>{' '}
            <span className="text-white">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-lg md:text-xl text-text-muted mb-4 max-w-2xl mx-auto text-center"
          >
            A mobile-first agentic healthcare ecosystem combining{' '}
            <span className="text-primary-light font-semibold">collaborative AI agents</span>,{' '}
            <span className="text-secondary-light font-semibold">predictive wellness intelligence</span>,{' '}
            and{' '}
            <span className="text-accent font-semibold">blockchain-secured trust</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-text-dim text-sm mb-8"
          >
            Empowering women through personalized preventive healthcare
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/auth')}
              className="btn-primary animate-pulse-glow flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              <span className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight size={20} />
              </span>
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Learn More
              <ChevronRight size={18} />
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 flex justify-center gap-8 md:gap-16"
          >
            {[
              { value: '7', label: 'AI Agents' },
              { value: '3', label: 'ML Models' },
              { value: '100%', label: 'Privacy' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-primary-text">
                  {stat.value}
                </div>
                <div className="text-xs text-text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* === FEATURES SECTION === */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="badge badge-primary mb-4">
              <Zap size={12} /> Core Technology
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-bold mb-4">
              Three Pillars of <span className="gradient-primary-text">Trust</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-text-muted max-w-2xl mx-auto text-center text-lg">
              A unique convergence of AI, machine learning, and blockchain to deliver
              transparent, personalized healthcare.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                icon: Bot,
                title: 'Agentic AI Workflow',
                desc: '7 specialized AI agents collaborate to analyze your health data — intake, risk assessment, nutrition, fitness, emotional wellness, validation, and reporting.',
                color: 'primary',
                features: ['CrewAI Orchestration', 'Multi-Agent Collaboration', 'Real-time Processing'],
              },
              {
                icon: LineChart,
                title: 'ML Prediction Engine',
                desc: 'Advanced machine learning models predict obesity, gestational diabetes, and Type 2 diabetes risk with explainable AI insights.',
                color: 'secondary',
                features: ['Random Forest / XGBoost', 'Explainable AI', 'Future Risk Simulation'],
              },
              {
                icon: Lock,
                title: 'Blockchain Verification',
                desc: 'Every health report is cryptographically hashed and stored on Polygon blockchain — immutable, tamper-proof, and privacy-preserving.',
                color: 'accent',
                features: ['Polygon Network', 'Smart Contracts', 'Zero PII on Chain'],
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="glass-card glass-card-hover p-8 flex flex-col items-center text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    feature.color === 'primary'
                      ? 'bg-primary/15 text-primary-light'
                      : feature.color === 'secondary'
                      ? 'bg-secondary/15 text-secondary-light'
                      : 'bg-accent/15 text-accent'
                  }`}
                >
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-muted text-sm mb-6 flex-1">{feature.desc}</p>
                <div className="space-y-3 w-full">
                  {feature.features.map((f, j) => (
                    <div key={j} className="flex items-center justify-center gap-2 text-sm text-text-dim bg-surface-lighter/30 py-2 px-3 rounded-lg">
                      <Star size={14} className="text-primary-light" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="py-24 px-6 bg-background-light relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="badge badge-primary mb-4">
              <Sparkles size={12} /> How It Works
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-bold mb-4">
              Your Wellness <span className="gradient-primary-text">Journey</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-6"
          >
            {[
              {
                step: '01',
                title: 'Share Your Story',
                desc: 'Chat naturally with our AI intake agent about your symptoms, lifestyle, and health goals.',
                icon: '💬',
              },
              {
                step: '02',
                title: 'AI Agents Collaborate',
                desc: '7 specialized agents work together — analyzing risks, creating nutrition plans, and generating insights.',
                icon: '🤖',
              },
              {
                step: '03',
                title: 'Get Predictions',
                desc: 'ML models predict your health risks with explainable factors and confidence scores.',
                icon: '📊',
              },
              {
                step: '04',
                title: 'Simulate Your Future',
                desc: 'See how lifestyle changes today can reduce your future health risks with interactive simulations.',
                icon: '🔮',
              },
              {
                step: '05',
                title: 'Blockchain Verified',
                desc: 'Your report is hashed and stored on Polygon — creating an immutable, tamper-proof health record.',
                icon: '🛡️',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-primary tracking-widest">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === HEALTH FOCUS AREAS === */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-bold mb-4">
              Designed for <span className="gradient-primary-text">Every Stage</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-text-muted max-w-xl mx-auto text-center text-lg">
              Personalized care across every phase of a woman's health journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { emoji: '🤰', title: 'Pregnancy', desc: 'GDM risk, nutrition, prenatal fitness' },
              { emoji: '🍼', title: 'Postpartum', desc: 'Recovery tracking, mental wellness' },
              { emoji: '🌸', title: 'Menopause', desc: 'Hormonal health, bone density' },
              { emoji: '💪', title: 'Wellness', desc: 'Obesity prevention, metabolic health' },
            ].map((stage, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="glass-card glass-card-hover p-6 text-center"
              >
                <div className="text-4xl mb-3">{stage.emoji}</div>
                <h3 className="font-bold mb-1">{stage.title}</h3>
                <p className="text-text-dim text-xs">{stage.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 px-6 gradient-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your{' '}
            <span className="gradient-primary-text">Health?</span>
          </h2>
          <p className="text-text-muted mb-8">
            Join the future of personalized, AI-powered, blockchain-verified healthcare.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary animate-pulse-glow text-lg px-10 py-4"
          >
            <span className="flex items-center gap-2">
              Get Started Free
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-primary" />
            <span className="font-bold gradient-primary-text">HerChain AI</span>
          </div>
          <p className="text-text-dim text-sm">
            © 2025 HerChain AI. Privacy-first healthcare for every woman.
          </p>
        </div>
      </footer>
    </div>
  )
}
