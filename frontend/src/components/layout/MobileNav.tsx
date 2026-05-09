import { useLocation, useNavigate } from 'react-router-dom'
import { MessageCircle, LayoutDashboard, Shield, User } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/chat', label: 'AI Chat', icon: MessageCircle },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/blockchain', label: 'Verify', icon: Shield },
]

export function MobileNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="mobile-nav">
      <div className="flex justify-around items-center max-w-[480px] mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-bg relative">
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-[10px] bg-primary/15"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
