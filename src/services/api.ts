import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'

// ==================== TYPES ====================

// Tipos de respuesta de la API
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

// Tipos de usuario
export interface User {
  id: string
  email: string
  nombre: string
  apellido: string
  telefono?: string
  rol: 'admin' | 'usuario' | 'operador'
  foto?: string
  createdAt: string
  updatedAt: string
}

// Tipos de autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  password: string
  nombre: string
  apellido: string
  telefono?: string
}

// Tipos de placas
export interface Coordenada {
  lat: number
  lng: number
  timestamp?: string
}

export interface Placa {
  id: string
  numero: string
  estado: 'Robado' | 'Verificado' | 'Buscado' | 'Sospechoso'
  vehiculo?: {
    marca: string
    modelo: string
    color: string
    año: number
  }
  ubicacion: string
  coordenadas: Coordenada[]
  fechaDeteccion: string
  accion: string
  usuarioReporte?: string
  imagenes?: string[]
  detalles?: string
}

export interface PlacaFilters {
  estado?: string
  fechaInicio?: string
  fechaFin?: string
  search?: string
  page?: number
  limit?: number
}

// Tipos de reportes
export interface Reporte {
  id: string
  tipo: 'robo' | 'sospecha' | 'accidente' | 'otro'
  placa: string
  descripcion: string
  ubicacion: string
  coordenadas: Coordenada
  estado: 'pendiente' | 'en_proceso' | 'resuelto' | 'rechazado'
  prioridad: 'baja' | 'media' | 'alta' | 'urgente'
  imagenes?: string[]
  usuarioId: string
  fechaReporte: string
  fechaActualizacion?: string
}

export interface CreateReporteRequest {
  tipo: Reporte['tipo']
  placa: string
  descripcion: string
  ubicacion: string
  coordenadas: Coordenada
  prioridad?: Reporte['prioridad']
  imagenes?: File[]
}

// Tipos de estadísticas
export interface Estadisticas {
  totalDetecciones: number
  placasRobadas: number
  placasVerificadas: number
  alertasEnviadas: number
  deteccionesPorDia: Array<{
    fecha: string
    cantidad: number
  }>
  deteccionesPorEstado: Array<{
    estado: string
    cantidad: number
    porcentaje: number
  }>
  zonasConMasDetecciones: Array<{
    ubicacion: string
    cantidad: number
  }>
}

// Tipos de geocodificación
export interface GeocodingResult {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  placeId?: string
  formattedAddress?: string
}

// ==================== CONFIGURACIÓN ====================

// Usar proxy de Vite en desarrollo, URL directa en producción
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'  // En desarrollo usa el proxy de Vite
  : import.meta.env.VITE_API_URL || 'https://gateway.helmer-pardo.com'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// ==================== INTERCEPTORS ====================

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error: AxiosError) => {
    console.error('❌ Error en la petición:', error)
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Respuesta exitosa de ${response.config.url}`)
    return response
  },
  (error: AxiosError<ApiResponse>) => {
    console.error('❌ Error en la respuesta:', error)
    
    // Manejar diferentes tipos de errores
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          console.error('🔒 No autorizado - Token inválido o expirado')
          localStorage.removeItem('authToken')
          localStorage.removeItem('isLoggedIn')
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('⛔ Prohibido - No tienes permisos')
          break
        case 404:
          console.error('🔍 No encontrado')
          break
        case 500:
          console.error('💥 Error del servidor')
          break
        default:
          console.error(`⚠️ Error ${status}:`, data?.message || 'Error desconocido')
      }
      
      return Promise.reject(data?.message || `Error ${status}`)
    } else if (error.request) {
      console.error('📡 Sin respuesta del servidor')
      return Promise.reject('No se pudo conectar con el servidor. Verifica tu conexión.')
    } else {
      console.error('⚙️ Error de configuración:', error.message)
      return Promise.reject(error.message)
    }
  }
)

// ==================== AUTENTICACIÓN ====================

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', { email, password })
    
    // Guardar token si viene en la respuesta
    if (response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userData', JSON.stringify(response.data.data.user))
    }
    
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (userData: RegisterRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/auth/register', userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logoutUser = (): void => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userData')
  console.log('👋 Sesión cerrada')
}

// Alias para compatibilidad con código existente
export const logout = logoutUser

export const verifyToken = async (): Promise<{ valid: boolean; user?: User }> => {
  try {
    const response = await api.get<ApiResponse<{ valid: boolean; user?: User }>>('/auth/verify')
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const requestPasswordReset = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/auth/forgot-password', { email })
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (token: string, newPassword: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/auth/reset-password', { token, newPassword })
    return response.data
  } catch (error) {
    throw error
  }
}

// ==================== PLACAS ====================

export const getPlacasHistory = async (filters?: PlacaFilters): Promise<Placa[]> => {
  try {
    const response = await api.get<ApiResponse<Placa[]>>('/placas/history', { params: filters })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const searchPlaca = async (numeroPlaca: string): Promise<Placa | null> => {
  try {
    const response = await api.get<ApiResponse<Placa>>(`/placas/search/${numeroPlaca}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const reportPlaca = async (placaData: Partial<Placa>): Promise<Placa> => {
  try {
    const response = await api.post<ApiResponse<Placa>>('/placas/report', placaData)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getPlacaDetails = async (placaId: string): Promise<Placa> => {
  try {
    const response = await api.get<ApiResponse<Placa>>(`/placas/${placaId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updatePlacaStatus = async (
  placaId: string, 
  status: Placa['estado']
): Promise<Placa> => {
  try {
    const response = await api.patch<ApiResponse<Placa>>(`/placas/${placaId}/status`, { status })
    return response.data.data
  } catch (error) {
    throw error
  }
}

// ==================== REPORTES ====================

export const getReports = async (filters?: Record<string, any>): Promise<Reporte[]> => {
  try {
    const response = await api.get<ApiResponse<Reporte[]>>('/reports', { params: filters })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createReport = async (reportData: CreateReporteRequest): Promise<Reporte> => {
  try {
    const formData = new FormData()
    
    // Agregar campos de texto
    Object.entries(reportData).forEach(([key, value]) => {
      if (key !== 'imagenes' && value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
      }
    })
    
    // Agregar imágenes si existen
    if (reportData.imagenes && reportData.imagenes.length > 0) {
      reportData.imagenes.forEach((file) => {
        formData.append('imagenes', file)
      })
    }
    
    const response = await api.post<ApiResponse<Reporte>>('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getStatistics = async (period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<Estadisticas> => {
  try {
    const response = await api.get<ApiResponse<Estadisticas>>('/statistics', { params: { period } })
    return response.data.data
  } catch (error) {
    throw error
  }
}

// ==================== USUARIO ====================

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get<ApiResponse<User>>('/user/profile')
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put<ApiResponse<User>>('/user/profile', userData)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const changePassword = async (
  currentPassword: string, 
  newPassword: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/user/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const uploadProfilePhoto = async (file: File): Promise<{ url: string }> => {
  try {
    const formData = new FormData()
    formData.append('photo', file)
    
    const response = await api.post<ApiResponse<{ url: string }>>('/user/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

// ==================== GEOCODIFICACIÓN ====================

export const getLocationByCoords = async (lat: number, lng: number): Promise<GeocodingResult> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_MAPS_API_KEY
        }
      }
    )
    
    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0]
      return {
        address: result.formatted_address,
        coordinates: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        placeId: result.place_id,
        formattedAddress: result.formatted_address
      }
    }
    
    throw new Error('No se encontraron resultados para estas coordenadas')
  } catch (error) {
    throw error
  }
}

export const getCoordsByAddress = async (address: string): Promise<GeocodingResult> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: GOOGLE_MAPS_API_KEY
        }
      }
    )
    
    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0]
      return {
        address: result.formatted_address,
        coordinates: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        placeId: result.place_id,
        formattedAddress: result.formatted_address
      }
    }
    
    throw new Error('No se encontraron resultados para esta dirección')
  } catch (error) {
    throw error
  }
}

// ==================== UTILIDADES ====================

// Obtener datos del usuario desde localStorage
export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem('userData')
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error)
    return null
  }
}

// Verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('authToken')
}

// Obtener token de autenticación
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}

export default api
