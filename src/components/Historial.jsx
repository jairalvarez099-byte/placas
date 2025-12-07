import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './css/Historial.css'

// Fix para los iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
})

// Icono personalizado para vehículos robados
const robadoIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Icono para vehículos verificados
const verificadoIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Componente para ajustar el mapa cuando cambian las coordenadas
function MapUpdater({ bounds }) {
  const map = useMap()
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      try {
        // Ajustar el mapa para mostrar todas las coordenadas
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
      } catch (error) {
        console.error('Error ajustando el mapa:', error)
      }
    }
  }, [bounds, map])
  
  return null
}

function Historial() {
  const [selectedPlaca, setSelectedPlaca] = useState(null)

  useEffect(() => {
    console.log('📍 Placa seleccionada cambió a:', selectedPlaca)
  }, [selectedPlaca])

  const registros = [
    {
      id: 1,
      placa: 'ABC-1234',
      fecha: '2024-01-15 14:30:25',
      estado: 'Robado',
      ubicacion: 'Av. Principal 123',
      
      accion: 'Alerta Enviada',
      coordenadas: [
        [19.4326, -99.1332], // Ciudad de México - punto inicial
        [19.4350, -99.1300],
        [19.4375, -99.1250],
        [19.4400, -99.1200],
        [19.4425, -99.1150], // punto final
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
  
  useEffect(() => {
    if (registroSeleccionado) {
      console.log('🚗 Registro encontrado:', registroSeleccionado)
      console.log('📌 Coordenadas:', registroSeleccionado.coordenadas)
    }
  }, [registroSeleccionado])

  const handleRowClick = (placa) => {
    console.log('Placa seleccionada:', placa)
    if (selectedPlaca === placa) {
      // Si se hace clic en la misma placa, deseleccionarla
      setSelectedPlaca(null)
    } else {
      setSelectedPlaca(placa)
    }
  }

  // Calcular el centro del mapa basado en las coordenadas del registro seleccionado
  const getMapCenter = () => {
    if (registroSeleccionado && registroSeleccionado.coordenadas && registroSeleccionado.coordenadas.length > 0) {
      const coords = registroSeleccionado.coordenadas
      const lat = coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length
      const lng = coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length
      return [lat, lng]
    }
    return [19.4326, -99.1332] // Ciudad de México por defecto
  }

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h2>Historial de Detecciones</h2>
        <p>Registro completo de todas las placas detectadas - Haz clic en una fila para ver la ruta en el mapa</p>
      </div>

      <div className="historial-filters">
        <input
          type="text"
          placeholder="Buscar por placa, vehículo o ubicación..."
          className="search-input"
        />
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
                  onClick={() => {
                    console.log('Click en fila:', registro.placa)
                    handleRowClick(registro.placa)
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="placa-cell">
                    <strong>{registro.placa}</strong>
                  </td>
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
                <span className="map-vehiculo">{registroSeleccionado.vehiculo}</span>
              </div>
            ) : (
              <p className="map-placeholder-text">Selecciona un vehículo de la tabla para ver su ruta</p>
            )}
          </div>
          
          {registroSeleccionado && registroSeleccionado.coordenadas && registroSeleccionado.coordenadas.length > 0 ? (
            <MapContainer
              key={selectedPlaca}
              center={getMapCenter()}
              zoom={13}
              style={{ height: '100%', width: '100%', borderRadius: '8px' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Componente para actualizar la vista del mapa */}
              <MapUpdater bounds={registroSeleccionado.coordenadas} />
              
              {/* Mostrar marcadores en cada punto de la ruta */}
              {registroSeleccionado.coordenadas.map((coord, index) => (
                <Marker
                  key={`${selectedPlaca}-${index}`}
                  position={coord}
                  icon={registroSeleccionado.estado === 'Robado' ? robadoIcon : verificadoIcon}
                >
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <strong>Punto {index + 1}</strong><br />
                      Placa: {registroSeleccionado.placa}<br />
                      Vehículo: {registroSeleccionado.vehiculo}<br />
                      Estado: {registroSeleccionado.estado}<br />
                      Fecha: {registroSeleccionado.fecha}
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Dibujar la ruta como una línea */}
              <Polyline
                positions={registroSeleccionado.coordenadas}
                color={registroSeleccionado.estado === 'Robado' ? '#ef4444' : '#10b981'}
                weight={4}
                opacity={0.7}
              />
            </MapContainer>
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

