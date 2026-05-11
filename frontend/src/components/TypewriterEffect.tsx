import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypewriterEffectProps {
  content: string
  speed?: number
  onComplete?: () => void
}

export function TypewriterEffect({ content, speed = 15, onComplete }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let index = 0
    setIsTyping(true)
    setDisplayedText('')

    const timer = setInterval(() => {
      setDisplayedText(content.slice(0, index + 1))
      index++

      if (index >= content.length) {
        clearInterval(timer)
        setIsTyping(false)
        if (onComplete) onComplete()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [content, speed, onComplete])

  const renderContent = (text: string) => {
    return text.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-text-muted">{part.slice(1, -1)}</em>
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="relative inline-block w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre-wrap leading-relaxed inline"
      >
        {renderContent(displayedText)}
      </motion.div>
      <AnimatePresence>
        {isTyping && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } 
            }}
            className="inline-block w-1.5 h-4 ml-1 bg-primary align-middle shadow-[0_0_8px_rgba(225,29,116,0.5)]"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
