import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/OlvideContrasena.css'
import logo from './assest/logo.png'

function OlvideContrasena() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Aquí iría la lógica para enviar el email de recuperación
    console.log('Enviando email de recuperación a:', email)
    
    // Simulación de envío exitoso
    setEnviado(true)
  }

  return (
    <div className="olvide-container">
      <div className="olvide-card">
        <div className="olvide-header">
          <img src={logo} alt="GODeyeScan Logo" className="logo" />
          <h1>GodeyeScan</h1>
          <br />
          <p></p>
          <h2>Recuperar Contraseña</h2>
          <p>
            {!enviado 
              ? 'Ingresa tu correo electrónico para recibir instrucciones'
              : '¡Correo enviado exitosamente!'}
          </p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="olvide-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>

            <button type="submit" className="olvide-btn">
              Enviar Instrucciones
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✉️</div>
            <p>
              Hemos enviado las instrucciones de recuperación a <strong>{email}</strong>
            </p>
            <p className="check-spam">
              Si no encuentras el correo, revisa tu carpeta de spam.
            </p>
            <Link to="/login" className="back-to-login-btn">
              Volver al inicio de sesión
            </Link>
          </div>
        )}

        <div className="olvide-footer">
          <Link to="/login" className="back-link">
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OlvideContrasena
