import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Sparkles, Award, Star } from 'lucide-react'
import './ThankYouScreen.css'

export default function ThankYouScreen() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="thankyou-container">
      <div className="gradient-background" />
      
      <div className={`thankyou-content ${isVisible ? 'fade-in' : ''}`}>
        <div className="icon-container">
          <CheckCircle size={80} className="check-icon pulse" />
        </div>

        <h1 className="thankyou-title">
          Welcome to zoa<span className="title-dot">.</span>
        </h1>

        <p className="thankyou-message">
          Thank you for signing up! You're now part of our exclusive early access community.
        </p>

        <div className="badge-container">
          <div className="early-user-badge">
            <div className="badge-icon-wrapper">
              <Award size={32} className="badge-icon" />
              <Star size={16} className="badge-star badge-star-1" />
              <Star size={12} className="badge-star badge-star-2" />
              <Star size={14} className="badge-star badge-star-3" />
            </div>
            <div className="badge-content">
              <h3 className="badge-title">Early User</h3>
              <p className="badge-subtitle">Founding Member</p>
            </div>
          </div>
          <p className="badge-description">
            🎉 You've earned the <strong>Early User Badge</strong> that will be displayed on your profile!
          </p>
        </div>

        <div className="info-box">
          <p className="info-text">
            <strong>What's next?</strong>
          </p>
          <ul className="steps-list">
            <li>You'll receive an email notification when zoa goes live</li>
            <li>Early users get priority access to all features</li>
            <li>Your feedback will help shape the future of zoa</li>
          </ul>
        </div>

        <div className="button-container">
          <button
            className="primary-button"
            onClick={() => navigate('/')}
          >
            <span>Back to Home</span>
            <Sparkles size={20} className="button-icon" />
          </button>
        </div>

        <p className="help-text">
          Have questions?{' '}
          <button className="help-link" onClick={() => navigate('/')}>
            Contact us
          </button>
        </p>
      </div>
    </div>
  )
}
