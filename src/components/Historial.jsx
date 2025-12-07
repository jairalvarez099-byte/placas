import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api'
import './css/Historial.css'

const MAP_CONTAINER_STYLE = { width: '100%', height: '100%', borderRadius: '8px' }

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function Historial() {
  const [selectedPlaca, setSelectedPlaca] = useState(null)

  const registros = [
    {
      id: 1,
      placa: 'ABC-1234',
      fecha: '2024-01-15 14:30:25',
      estado: 'Robado',
      ubicacion: 'Av. Principal 123',
      
      accion: 'Alerta Enviada',
      coordenadas: [
        [19.4326, -99.1332],
        [19.4350, -99.1300],
        [19.4375, -99.1250],
        [19.4400, -99.1200],
        [19.4425, -99.1150],
      ]
    },
    {
      id: 2,
      placa: 'XYZ-5678',
      fecha: '2024-01-15 12:15:10',
      estado: 'Verificado',
      ubicacion: 'Calle Secundaria 456',
     
      accion: 'Sin Acción',
      coordenadas: [
        [19.4200, -99.1400],
        [19.4220, -99.1380],
        [19.4240, -99.1360],
      ]
    },
    {
      id: 3,
      placa: 'DEF-9012',
      fecha: '2024-01-14 18:45:33',
      estado: 'Robado',
      ubicacion: 'Boulevard Norte 789',
      
      accion: 'Alerta Enviada',
      coordenadas: [
        [19.4500, -99.1500],
        [19.4520, -99.1480],
        [19.4540, -99.1460],
        [19.4560, -99.1440],
        [19.4580, -99.1420],
        [19.4600, -99.1400],
      ]
    },
    {
      id: 4,
      placa: 'GHI-3456',
      fecha: '2024-01-14 10:20:15',
      estado: 'Verificado',
      ubicacion: 'Av. Sur 321',
      
      accion: 'Sin Acción',
      coordenadas: [
        [19.4100, -99.1600],
        [19.4120, -99.1580],
      ]
    },
  ]

  const registroSeleccionado = registros.find(r => r.placa === selectedPlaca)

  const handleRowClick = (placa) => {
    if (selectedPlaca === placa) setSelectedPlaca(null)
    else setSelectedPlaca(placa)
  }

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY })

  if (!isLoaded) return <p>Cargando mapa...</p>

  const getMapCenter = () => {
    if (registroSeleccionado && registroSeleccionado.coordenadas.length > 0) {
      const coords = registroSeleccionado.coordenadas
      const lat = coords.reduce((sum, c) => sum + c[0], 0) / coords.length
      const lng = coords.reduce((sum, c) => sum + c[1], 0) / coords.length
      return { lat, lng }
    }
    return { lat: 19.4326, lng: -99.1332 }
  }

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h2>Historial de Detecciones</h2>
        <p>Registro completo de todas las placas detectadas - Haz clic en una fila para ver la ruta en el mapa</p>
      </div>

      <div className="historial-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por placa, vehículo o ubicación..."
            className="search-input"
          />
          <button className="search-btn">🔍 Buscar</button>
        </div>
        <select className="filter-select">
          <option value="">Todos los estados</option>
          <option value="robado">Robado</option>
          <option value="verificado">Verificado</option>
        </select>
        <input type="date" className="date-input" />
      </div>

      <div className="historial-content">
        <div className="historial-table-container">
          <table className="historial-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr
                  key={registro.id}
                  className={selectedPlaca === registro.placa ? 'selected-row' : ''}
                  onClick={() => handleRowClick(registro.placa)}
                  style={{ cursor: 'pointer' }}
                >
                  <td><strong>{registro.placa}</strong></td>
                  <td>{registro.fecha}</td>
                  <td>
                    <span className={`badge ${registro.estado.toLowerCase()}`}>
                      {registro.estado}
                    </span>
                  </td>
                  <td>{registro.ubicacion}</td>
                  <td>{registro.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="historial-map-container">
          <div className="map-header">
            <h3>Ruta del Vehículo</h3>
            {registroSeleccionado ? (
              <div className="map-info">
                <span className="map-placa">{registroSeleccionado.placa}</span>
                
              </div>
            ) : (
              <p className="map-placeholder-text">Selecciona un vehículo de la tabla para ver su ruta</p>
            )}
          </div>

          {registroSeleccionado && registroSeleccionado.coordenadas.length > 0 ? (
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={getMapCenter()}
              zoom={13}
            >
              {registroSeleccionado.coordenadas.map((coord, idx) => (
                <Marker
                  key={idx}
                  position={{ lat: coord[0], lng: coord[1] }}
                  label={{ text: `${idx + 1}`, color: 'white' }}
                />
              ))}

              {registroSeleccionado.coordenadas.length > 1 && (
                <Polyline
                  path={registroSeleccionado.coordenadas.map(c => ({ lat: c[0], lng: c[1] }))}
                  options={{
                    strokeColor: registroSeleccionado.estado === 'Robado' ? '#ff0000' : '#00ff00',
                    strokeOpacity: 0.7,
                    strokeWeight: 4
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div className="map-placeholder">
              <div className="placeholder-icon">🗺️</div>
              <p>No hay ruta seleccionada</p>
              <p className="placeholder-subtitle">Haz clic en una fila de la tabla para ver la ruta del vehículo</p>
            </div>
          )}
        </div>
      </div>

      <div className="historial-pagination">
        <button className="pagination-btn">Anterior</button>
        <span className="pagination-info">Página 1 de 5</span>
        <button className="pagination-btn">Siguiente</button>
      </div>
    </div>
  )
}

export default Historial
