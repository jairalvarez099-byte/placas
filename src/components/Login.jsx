import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import './css/Login.css'
import logo from './assest/logo.png'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar error al escribir
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    console.log('🚀 Intentando iniciar sesión con:', formData.email)

    try {
      const response = await loginUser(formData.email, formData.password)
      
      console.log('✅ Login exitoso!')
      console.log('👤 Usuario:', response.data.user)
      console.log('🔑 Token guardado en localStorage')
      console.log('📋 Headers que se enviarán en próximas peticiones:')
      console.log('Authorization: Bearer ' + localStorage.getItem('authToken'))
      
      // Navegar al dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Error en login:', err)
      setError(typeof err === 'string' ? err : 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header" >
          <img src={logo} alt="GODeyeScan Logo" className="logo" />
          <h1>GodeyeScan</h1>
          <p>Sistema de Detección de Placas</p>
          <br />    
          <h2>Iniciar Sesión</h2>
          <p></p>
          <br />

          
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <Link to="/olvide-contrasena" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="register-link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
