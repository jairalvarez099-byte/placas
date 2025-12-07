import React from 'react'
import './css/Reportes.css'

function Reportes() {
  const estadisticas = [
    { label: 'Total de Detecciones', value: '1,234', icon: '📊', color: '#3b82f6' },
    { label: 'Vehículos Robados', value: '89', icon: '🚨', color: '#ef4444' },
    { label: 'Alertas Enviadas', value: '67', icon: '📢', color: '#f59e0b' },
    
  ]

  const reportesRecientes = [
    {
      id: 1,
      titulo: 'Reporte Semanal - Semana 3',
      fecha: '2024-01-15',
      tipo: 'Semanal',
      descargas: 12
    },
    {
      id: 2,
      titulo: 'Reporte Mensual - Enero 2024',
      fecha: '2024-01-31',
      tipo: 'Mensual',
      descargas: 45
    },
    {
      id: 3,
      titulo: 'Reporte de Alertas Críticas',
      fecha: '2024-01-14',
      tipo: 'Especial',
      descargas: 8
    },
  ]

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2>Reportes y Estadísticas</h2>
        <p>Análisis y reportes del sistema de detección</p>
      </div>

      <div className="estadisticas-grid">
        {estadisticas.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="reportes-section">
        <div className="section-header">
          <h3>Generar Nuevo Reporte</h3>
        </div>
        <div className="reporte-form-card">
          

          <div className="form-row">
            <div className="form-group">
              <label>Fecha Inicio</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label>Fecha Fin</label>
              <input type="date" className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label>Formato</label>
            <div className="format-options">
              <label className="format-option">
                <input type="radio" name="format" value="excel" defaultChecked />
                <span>Excel</span>
              </label>
                  
              
            </div>
          </div>

          <button className="btn-generate">Generar Reporte</button>
        </div>
      </div>

      <div className="reportes-section">
        <div className="section-header">
          <h3>Reportes Recientes</h3>
        </div>
        <div className="reportes-list">
          {reportesRecientes.map((reporte) => (
            <div key={reporte.id} className="reporte-item">
              <div className="reporte-info">
                <h4>{reporte.titulo}</h4>
                <div className="reporte-meta">
                  <span className="reporte-tipo">{reporte.tipo}</span>
                  <span className="reporte-fecha">{reporte.fecha}</span>
                  <span className="reporte-descargas">{reporte.descargas} descargas</span>
                </div>
              </div>
              <div className="reporte-actions">
                <button className="btn-download">⬇️ Descargar</button>
                <button className="btn-view">👁️ Ver</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reportes

