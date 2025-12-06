import React, { useState } from 'react'
import './Camara.css'

function Camara() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [detecciones, setDetecciones] = useState([])

  const handleStartStream = () => {
    setIsStreaming(true)
    // Aquí iría la lógica para iniciar el stream de la cámara
    console.log('Iniciando stream de cámara...')
  }

  const handleStopStream = () => {
    setIsStreaming(false)
    // Aquí iría la lógica para detener el stream
    console.log('Deteniendo stream de cámara...')
  }

  const handleCapture = () => {
    // Simulación de captura
    const nuevaDeteccion = {
      id: Date.now(),
      placa: 'ABC-' + Math.floor(Math.random() * 10000),
      timestamp: new Date().toLocaleString('es-ES'),
      estado: Math.random() > 0.5 ? 'Robado' : 'Verificado',
      confianza: (85 + Math.random() * 15).toFixed(1) + '%'
    }
    setDetecciones([nuevaDeteccion, ...detecciones])
  }

  return (
    <div className="camara-container">
      <div className="camara-header">
        <h2>Detección en Tiempo Real</h2>
        <p>Monitoreo y detección de placas mediante cámara</p>
      </div>

      <div className="camara-content">
        <div className="camara-main">
          <div className="video-container">
            {isStreaming ? (
              <div className="video-placeholder active">
                <div className="stream-indicator">
                  <span className="indicator-dot"></span>
                  <span>Transmitiendo en vivo</span>
                </div>
                <div className="video-overlay">
                  <div className="detection-box">
                    <span className="detection-label">ABC-1234</span>
                    <span className="detection-confidence">94.5%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-icon">📷</div>
                <p>La cámara está inactiva</p>
                <p className="placeholder-subtitle">Haz clic en "Iniciar Cámara" para comenzar</p>
              </div>
            )}

            <div className="video-controls">
              {!isStreaming ? (
                <button className="btn-start" onClick={handleStartStream}>
                  ▶️ Iniciar Cámara
                </button>
              ) : (
                <>
                  <button className="btn-capture" onClick={handleCapture}>
                    📸 Capturar
                  </button>
                  <button className="btn-stop" onClick={handleStopStream}>
                    ⏹️ Detener
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="configuracion-panel">
            <h3>Configuración</h3>
            <div className="config-group">
              <label>Fuente de Video</label>
              <select className="config-select">
                <option value="webcam">Cámara Web</option>
                <option value="ip">Cámara IP</option>
                <option value="archivo">Archivo de Video</option>
              </select>
            </div>

            <div className="config-group">
              <label>Sensibilidad de Detección</label>
              <input type="range" min="0" max="100" defaultValue="75" className="config-slider" />
              <span className="slider-value">75%</span>
            </div>

            <div className="config-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Alertas Automáticas
              </label>
            </div>

            <div className="config-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Guardar Detecciones
              </label>
            </div>
          </div>
        </div>

        <div className="detecciones-panel">
          <div className="panel-header">
            <h3>Detecciones Recientes</h3>
            <span className="detecciones-count">{detecciones.length}</span>
          </div>

          <div className="detecciones-list">
            {detecciones.length === 0 ? (
              <div className="empty-state">
                <p>No hay detecciones aún</p>
                <p className="empty-subtitle">Las placas detectadas aparecerán aquí</p>
              </div>
            ) : (
              detecciones.map((deteccion) => (
                <div key={deteccion.id} className="deteccion-item">
                  <div className="deteccion-placa">
                    <strong>{deteccion.placa}</strong>
                    <span className={`deteccion-estado ${deteccion.estado.toLowerCase()}`}>
                      {deteccion.estado}
                    </span>
                  </div>
                  <div className="deteccion-info">
                    <span className="deteccion-time">{deteccion.timestamp}</span>
                    <span className="deteccion-confianza">Confianza: {deteccion.confianza}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Camara

