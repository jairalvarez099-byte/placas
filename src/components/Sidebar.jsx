import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/api'
import './css/Sidebar.css'

function Sidebar({ activeView, setActiveView }) {
  const navigate = useNavigate()
  
  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: '👤' },
    { id: 'historial', label: 'Historial', icon: '📋' },
    { id: 'reportes', label: 'Reportes', icon: '📊' },
    
  ]

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      console.log('Cerrando sesión...')
      logout() // Usar la función del servicio API
      navigate('/login')
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title"> Menu</h1>
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

