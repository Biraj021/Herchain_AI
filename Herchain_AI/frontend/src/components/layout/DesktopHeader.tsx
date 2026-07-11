import { Link, useLocation } from 'react-router-dom'
import { Heart, Home, MessageSquare, Shield, Activity } from 'lucide-react'

export function DesktopHeader() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Activity },
    { path: '/chat', label: 'AI Chat', icon: MessageSquare },
    { path: '/blockchain', label: 'Verify', icon: Shield },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Heart size={20} className="text-primary" />
          </div>
          <span className="font-bold text-xl gradient-primary-text">HerChain AI</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary/15 text-primary-light border border-primary/20' 
                    : 'text-text-dim hover:bg-surface-lighter hover:text-text'
                }`}
              >
                <item.icon size={16} className={isActive ? 'text-primary' : ''} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
