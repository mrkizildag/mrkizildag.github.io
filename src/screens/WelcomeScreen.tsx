import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Zap, Trophy, Target } from 'lucide-react'
import { theme } from '../theme/colors'
import './WelcomeScreen.css'

interface FloatingParticleProps {
  delay: number
  duration: number
  startX: number
  startY: number
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>
}

function FloatingParticle({ delay, duration, startX, startY, icon: Icon }: FloatingParticleProps) {
  return (
    <div
      className="floating-particle"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      <Icon size={24} color={theme.colors.primary} />
    </div>
  )
}

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const particles = [
    { icon: Sparkles, delay: 0, duration: 4000, startX: 20, startY: 70 },
    { icon: Zap, delay: 500, duration: 4500, startX: 80, startY: 75 },
    { icon: Trophy, delay: 1000, duration: 5000, startX: 15, startY: 65 },
    { icon: Target, delay: 1500, duration: 4200, startX: 75, startY: 80 },
    { icon: Sparkles, delay: 2000, duration: 4800, startX: 50, startY: 85 },
    { icon: Zap, delay: 2500, duration: 4300, startX: 30, startY: 72 },
  ]

  return (
    <div className="welcome-container">
      <div className="gradient-background" />
      
      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <FloatingParticle key={index} {...particle} />
      ))}

      <div className={`welcome-content ${isVisible ? 'fade-in' : ''}`}>
        {/* Logo Section */}
        <div className="logo-container">
          <h1 className="title pulse">
            zoa<span className="title-dot">.</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="tagline-container">
          <h2 className="tagline">
            Where Athletes <span className="tagline-highlight">Connect</span> & Compete
          </h2>
        </div>

        {/* Description */}
        <p className="description">
          Find your game. Book your match. Level up your sports life.
        </p>

        {/* Action Buttons */}
        <div className="button-container">
          <button
            className="primary-button"
            onClick={() => navigate('/signup')}
          >
            <span>Get Started</span>
            <Sparkles size={20} className="button-icon" />
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/signup')}
          >
            Sign In
          </button>
        </div>

        {/* Footer Stats */}
        <div className="footer-container">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Athletes</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Venues</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Matches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
