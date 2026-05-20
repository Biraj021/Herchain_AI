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
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(225,29,116,0.15) 0%, transparent 70%)',
              top: '-10%',
              left: '-10%',
            }}
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)',
              bottom: '-10%',
              right: '-15%',
            }}
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 50, 0],
              scale: [1.1, 1, 1.1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
              top: '30%',
              right: '15%',
            }}
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
            className="text-lg md:text-xl text-text-muted mb-4 max-w-6xl mx-auto text-center px-4 [&_span]:!m-0 [&_span]:!p-0 [&_span]:!inline-block"
          >
            A mobile-first agentic healthcare ecosystem combining <span className="text-primary-light font-semibold">collaborative AI agents</span>, <br className="hidden md:block" />
            <span className="text-secondary-light font-semibold">predictive wellness intelligence</span>, and <span className="text-accent font-semibold">blockchain-secured trust</span>.
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
            className="mt-24 flex justify-center gap-8 md:gap-16"
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
      <section id="features" className="py-24 relative">
        <div className="features-section-container">
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
            <motion.p variants={fadeUp} custom={2} className="section-subtitle text-text-muted text-lg">
              A unique convergence of AI, machine learning, and blockchain to deliver
              transparent, personalized healthcare.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="features-cards-wrapper"
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
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="feature-card-item glass-card glass-card-hover h-full min-h-[350px] py-10 px-8 flex flex-col items-start text-left justify-between"
              >
                <div>
                  <div className="flex flex-col items-start gap-4 mb-6 w-full">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        feature.color === 'primary'
                          ? 'bg-primary/15 text-primary-light'
                          : feature.color === 'secondary'
                          ? 'bg-secondary/15 text-secondary-light'
                          : 'bg-accent/15 text-accent'
                      }`}
                    >
                      <feature.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                  </div>
                  
                  <p className="text-text-muted text-base mb-6 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                
                <div className="w-full space-y-3 mt-auto">
                  {feature.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-4 group">
                      <div className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                        feature.color === 'primary' ? 'bg-primary-light' : 
                        feature.color === 'secondary' ? 'bg-secondary-light' : 'bg-accent'
                      }`} />
                      <span className="text-base text-text-dim group-hover:text-text-muted transition-colors">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === HOW IT WORKS (FUTURISTIC TIMELINE) === */}
      <section id="how-it-works" className="py-32 relative overflow-hidden bg-[#05050A]">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-24"
          >
            <motion.span variants={fadeUp} custom={0} className="badge badge-primary mb-4 px-6 py-2">
              <Sparkles size={14} className="animate-pulse" /> AI Orchestration Pipeline
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              How <span className="gradient-primary-text">HerChain AI</span> Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-text-muted text-xl max-w-2xl mx-auto leading-relaxed">
              Your health journey, powered by intelligent agents in a secured neural ecosystem.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* The Central Glowing Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50 hidden md:block">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-accent blur-[2px] opacity-50" />
            </div>

            <div className="space-y-24 md:space-y-0">
              {[
                {
                  title: 'Share Your Story',
                  desc: 'Chat naturally with our AI intake agent about your symptoms, lifestyle, and health goals.',
                  icon: Bot,
                  step: '01',
                  color: 'primary',
                  align: 'left'
                },
                {
                  title: 'AI Agents Collaborate',
                  desc: 'Specialized AI agents analyze risks, nutrition, emotional wellness, and health patterns.',
                  icon: Sparkles,
                  step: '02',
                  color: 'secondary',
                  align: 'right'
                },
                {
                  title: 'Get Predictions',
                  desc: 'ML models predict future health risks with explainable confidence scores.',
                  icon: LineChart,
                  step: '03',
                  color: 'accent',
                  align: 'left'
                },
                {
                  title: 'Secure Blockchain Verification',
                  desc: 'Your wellness reports are securely verified using blockchain-based trust infrastructure.',
                  icon: Shield,
                  step: '04',
                  color: 'primary',
                  align: 'right'
                }
              ].map((item, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center ${item.align === 'right' ? 'md:flex-row-reverse' : ''} md:h-[300px]`}>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-1/2 px-4 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="glass-card p-8 md:p-10 relative group hover:border-primary/40 transition-all duration-500"
                    >
                      {/* Floating Gradient Background */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${
                        item.color === 'primary' ? 'from-primary/20 to-secondary/20' : 
                        item.color === 'secondary' ? 'from-secondary/20 to-accent/20' : 
                        'from-accent/20 to-primary/20'
                      } rounded-[22px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
                      
                      <div className="relative flex flex-col items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${item.color}/10 text-${item.color}-light border border-${item.color}/20 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <item.icon size={28} />
                        </div>
                        <div>
                          <span className={`text-xs font-black tracking-[0.3em] uppercase text-${item.color}-light mb-2 block`}>
                            PHASE {item.step}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                          <p className="text-text-muted text-lg leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#05050A] border-2 border-primary z-10 hidden md:flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${item.color} animate-ping`} />
                    <div className={`absolute inset-0 rounded-full bg-${item.color} blur-md opacity-50`} />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === HEALTH FOCUS AREAS === */}
      <section className="py-24 px-6">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-bold mb-4" style={{ textAlign: 'center' }}>
              Designed for <span className="gradient-primary-text">Every Stage</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-text-muted text-lg" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              Personalized care across every phase of a woman's health journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}
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
                style={{ flex: '1', minWidth: '200px', maxWidth: '260px' }}
              >
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{stage.emoji}</div>
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
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ textAlign: 'center' }}>
            Ready to Take Control of Your{' '}
            <span className="gradient-primary-text">Health?</span>
          </h2>
          <p className="text-text-muted mb-8" style={{ textAlign: 'center', maxWidth: '600px' }}>
            Join the future of personalized, AI-powered, blockchain-verified healthcare.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary animate-pulse-glow text-lg px-10 py-4"
            style={{ marginTop: '24px' }}
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
          <div className="flex items-center justify-center gap-2">
            <Heart size={20} className="text-primary" />
            <span className="font-bold gradient-primary-text">HerChain AI</span>
          </div>
          <p className="text-text-dim text-sm" style={{ textAlign: 'center' }}>
            © 2026 HerChain AI. Privacy-first healthcare for every woman.
          </p>
        </div>
      </footer>
    </div>
  )
}
