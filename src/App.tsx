import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './screens/WelcomeScreen'
import SignUpScreen from './screens/SignUpScreen'

function App() {
  return (
    <Router basename="/v0-zoa-public-web">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
