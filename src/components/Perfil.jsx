import React, { useState, useEffect } from 'react'
import { getUserData, getUserEmail, getUserRole, getUserId } from '../utils/auth'
import './css/Perfil.css'

function Perfil() {
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    role: ''
  })

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const user = getUserData()
    if (user) {
      setUserData(user)
    } else {
      // Cargar datos individuales si no hay userData completo
      setUserData({
        id: getUserId() || '',
        email: getUserEmail() || '',
        role: getUserRole() || ''
      })
    }
  }, [])

  const formatRole = (role) => {
    const roles = {
      'user': 'Usuario',
      'admin': 'Administrador',
      'operator': 'Operador'
    }
    return roles[role] || role
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h2>Perfil de Usuario</h2>
        <p>Gestiona tu información personal y configuración</p>
      </div>

      <div className="perfil-content">
        <div className="perfil-card">
          <div className="avatar-section">
            <div className="avatar">👤</div>
            <button className="edit-avatar-btn">Cambiar Foto</button>
          </div>

          <div className="info-section">
            <div className="info-group">
              <label>ID de Usuario</label>
              <input 
                type="text" 
                value={userData.id} 
                className="info-input" 
                disabled 
              />
            </div>

            <div className="info-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={userData.email} 
                className="info-input" 
                readOnly 
              />
            </div>

            <div className="info-group">
              <label>Rol</label>
              <input 
                type="text" 
                value={formatRole(userData.role)} 
                className="info-input" 
                disabled 
              />
            </div>

            <div className="info-group">
              <label>Estado</label>
              <div className="status-badge">
                <span className="status-dot active"></span>
                Activo
              </div>
            </div>
          </div>

          <div className="actions-section">
            <button className="btn-primary">Guardar Cambios</button>
            <button className="btn-secondary">Cambiar Contraseña</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil

