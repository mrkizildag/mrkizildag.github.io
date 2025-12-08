import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Sparkles } from 'lucide-react'
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
          Thank you for signing up! We've sent a confirmation email to verify your account.
        </p>

        <div className="info-box">
          <p className="info-text">
            <strong>Next steps:</strong>
          </p>
          <ol className="steps-list">
            <li>Check your email inbox</li>
            <li>Click the verification link</li>
            <li>Start connecting with athletes!</li>
          </ol>
        </div>

        <div className="button-container">
          <button
            className="primary-button"
            onClick={() => navigate('/login')}
          >
            <span>Go to Sign In</span>
            <Sparkles size={20} className="button-icon" />
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>

        <p className="help-text">
          Didn't receive the email? Check your spam folder or{' '}
          <button className="help-link" onClick={() => navigate('/signup')}>
            try signing up again
          </button>
        </p>
      </div>
    </div>
  )
}
