import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Sidebar from './Sidebar'
import Perfil from './Perfil'
import Historial from './Historial'
import Reportes from './Reportes'
import './css/Dashboard.css'

function Dashboard() {
  const [activeView, setActiveView] = useState('perfil')
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar autenticación al cargar el dashboard
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      console.log('❌ Usuario no autenticado, redirigiendo a login...')
      navigate('/login', { replace: true })
    } else {
      console.log('✅ Usuario autenticado correctamente')
    }
  }, [navigate])

  const renderContent = () => {
    switch (activeView) {
      case 'perfil':
        return <Perfil />
      case 'historial':
        return <Historial />
      case 'reportes':
        return <Reportes />
      
      default:
        return <Perfil />
    }
  }

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default Dashboard

