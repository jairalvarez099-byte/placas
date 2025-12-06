import React from 'react'
import './Perfil.css'

function Perfil() {
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
              <label>Nombre Completo</label>
              <input type="text" defaultValue="Juan Pérez" className="info-input" />
            </div>

            <div className="info-group">
              <label>Correo Electrónico</label>
              <input type="email" defaultValue="juan.perez@example.com" className="info-input" />
            </div>

            <div className="info-group">
              <label>Teléfono</label>
              <input type="tel" defaultValue="+52 555 123 4567" className="info-input" />
            </div>

            <div className="info-group">
              <label>Rol</label>
              <input type="text" defaultValue="Operador" className="info-input" disabled />
            </div>

            <div className="info-group">
              <label>Fecha de Registro</label>
              <input type="text" defaultValue="15 de Enero, 2024" className="info-input" disabled />
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

