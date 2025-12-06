import React from 'react'
import './Historial.css'

function Historial() {
  const registros = [
    {
      id: 1,
      placa: 'ABC-1234',
      fecha: '2024-01-15 14:30:25',
      estado: 'Robado',
      ubicacion: 'Av. Principal 123',
      vehiculo: 'Toyota Corolla 2020',
      accion: 'Alerta Enviada'
    },
    {
      id: 2,
      placa: 'XYZ-5678',
      fecha: '2024-01-15 12:15:10',
      estado: 'Verificado',
      ubicacion: 'Calle Secundaria 456',
      vehiculo: 'Honda Civic 2019',
      accion: 'Sin Acción'
    },
    {
      id: 3,
      placa: 'DEF-9012',
      fecha: '2024-01-14 18:45:33',
      estado: 'Robado',
      ubicacion: 'Boulevard Norte 789',
      vehiculo: 'Nissan Sentra 2021',
      accion: 'Alerta Enviada'
    },
    {
      id: 4,
      placa: 'GHI-3456',
      fecha: '2024-01-14 10:20:15',
      estado: 'Verificado',
      ubicacion: 'Av. Sur 321',
      vehiculo: 'Ford Focus 2018',
      accion: 'Sin Acción'
    },
  ]

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h2>Historial de Detecciones</h2>
        <p>Registro completo de todas las placas detectadas</p>
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

      <div className="historial-table-container">
        <table className="historial-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Fecha y Hora</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Vehículo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
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
                <td>{registro.vehiculo}</td>
                <td>{registro.accion}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

