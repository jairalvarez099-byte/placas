import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Registro.css'
import logo from './assest/logo.png'

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    // Aquí iría la lógica de registro
    console.log('Registrando usuario...', formData)
    
    // Simulación de registro exitoso
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
    navigate('/login')
  }

  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-header">
          <img src={logo} alt="GODeyeScan Logo" className="logo" />
          <h1>GodeyeScan</h1>
          <p>Únete al sistema de detección de placas</p>
          <br />
          <p></p>
          <h2>Crear Cuenta</h2>
          
        </div>

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />
          </div>

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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <div className="form-terms">
            <label>
              <input type="checkbox" required />
              <span>
                Acepto los{' '}
                <a href="#" className="terms-link">
                  términos y condiciones
                </a>
              </span>
            </label>
          </div>

          <button type="submit" className="registro-btn">
            Crear Cuenta
          </button>
        </form>

        <div className="registro-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="login-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registro
