import React from 'react'
import './Sidebar.css'

function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: '👤' },
    { id: 'historial', label: 'Historial', icon: '📋' },
    { id: 'reportes', label: 'Reportes', icon: '📊' },
    { id: 'camara', label: 'Cámara', icon: '📷' },
  ]

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      console.log('Cerrando sesión...')
      // Aquí iría la lógica de logout
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">🚔 Placas Robadas</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

