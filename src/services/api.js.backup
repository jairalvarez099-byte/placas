// Configuración de la API
const API_BASE_URL = 'https://gateway.helmer-pardo.com'

// Configuración de timeout
const FETCH_TIMEOUT = 10000 // 10 segundos

// Función helper para fetch con timeout
const fetchWithTimeout = async (url, options = {}, timeout = FETCH_TIMEOUT) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado. El servidor no responde.')
    }
    throw error
  }
}

// Función para hacer login
export const loginUser = async (email, password) => {
  try {
    console.log('📡 Conectando con:', `${API_BASE_URL}/auth/login`)
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      mode: 'cors', // Importante para CORS
      credentials: 'omit' // No enviar cookies
    })

    console.log('📡 Respuesta recibida - Status:', response.status)

    if (!response.ok) {
      let errorMessage = 'Error en la autenticación'
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch (e) {
        // Si no se puede parsear el error, usar mensaje genérico
        errorMessage = `Error ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log('✅ Datos recibidos correctamente')
    return data
    
  } catch (error) {
    console.error('❌ Error en loginUser:', error)
    
    // Mejorar mensajes de error
    if (error.message.includes('Failed to fetch')) {
      throw new Error('No se puede conectar con el servidor. Verifica:\n1. Tu conexión a internet\n2. Que el servidor esté activo\n3. Configuración de CORS en el servidor')
    }
    
    throw error
  }
}

// Función para registrar usuario
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error en el registro')
  }

  return await response.json()
}

// Función para recuperar contraseña
export const resetPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al enviar el correo')
  }

  return await response.json()
}

// Función para hacer peticiones autenticadas
export const authenticatedFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken')

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    }
  })

  // Si el token expiró, redirigir al login
  if (response.status === 401) {
    localStorage.clear()
    window.location.href = '/login'
    throw new Error('Sesión expirada')
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error en la petición')
  }

  return await response.json()
}

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const token = localStorage.getItem('authToken')
  const userId = localStorage.getItem('userId')
  const userEmail = localStorage.getItem('userEmail')
  
  // Verificar que TODOS los datos necesarios estén presentes
  if (!isLoggedIn || !token || !userId || !userEmail) {
    return false
  }
  
  // Verificar expiración de sesión (24 horas)
  try {
    const loginTimestamp = localStorage.getItem('loginTimestamp')
    if (loginTimestamp) {
      const hoursSinceLogin = (Date.now() - parseInt(loginTimestamp)) / (1000 * 60 * 60)
      if (hoursSinceLogin > 24) {
        console.warn('⚠️ Sesión expirada')
        logout()
        return false
      }
    }
  } catch (error) {
    console.error('Error verificando timestamp:', error)
  }
  
  return true
}

// Función para cerrar sesión
export const logout = () => {
  console.log('🚪 Cerrando sesión...')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userRole')
  localStorage.removeItem('userData')
  localStorage.removeItem('loginTimestamp')
  console.log('✅ Sesión cerrada correctamente')
}

export default {
  loginUser,
  registerUser,
  resetPassword,
  authenticatedFetch,
  isAuthenticated,
  logout
}
