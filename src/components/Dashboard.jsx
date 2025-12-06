import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Perfil from './Perfil'
import Historial from './Historial'
import Reportes from './Reportes'
import Camara from './Camara'
import './Dashboard.css'

function Dashboard() {
  const [activeView, setActiveView] = useState('perfil')

  const renderContent = () => {
    switch (activeView) {
      case 'perfil':
        return <Perfil />
      case 'historial':
        return <Historial />
      case 'reportes':
        return <Reportes />
      case 'camara':
        return <Camara />
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

