import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './SignUpScreen.css'

export default function SignUpScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      })

      if (signUpError) throw signUpError
      
      setSuccess(true)
      setError('')
      
      // Redirect to thank you page
      setTimeout(() => {
        navigate('/thank-you')
      }, 500)
      
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>

        <div className="signup-header">
          <h1 className="signup-title">Create account</h1>
          <p className="signup-subtitle">Join the community of athletes</p>
        </div>

        <form className="signup-form" onSubmit={handleSignUp}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              Account created! Check your email to verify.
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading || success}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoCapitalize="none"
              disabled={isLoading || success}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading || success}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || success}
          >
            {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <span className="footer-text">Already have an account? </span>
          <button className="footer-link" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}
