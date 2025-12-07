// Utilidades para manejar los datos del usuario

// Obtener todos los datos del usuario
export const getUserData = () => {
  const userData = localStorage.getItem('userData')
  return userData ? JSON.parse(userData) : null
}

// Obtener el ID del usuario
export const getUserId = () => {
  return localStorage.getItem('userId')
}

// Obtener el email del usuario
export const getUserEmail = () => {
  return localStorage.getItem('userEmail')
}

// Obtener el rol del usuario
export const getUserRole = () => {
  return localStorage.getItem('userRole')
}

// Obtener el token de autenticación
export const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const token = getAuthToken()
  return isLoggedIn && token
}

// Verificar si el usuario es administrador
export const isAdmin = () => {
  const role = getUserRole()
  return role === 'admin'
}

// Verificar si el usuario es un usuario regular
export const isUser = () => {
  const role = getUserRole()
  return role === 'user'
}

export default {
  getUserData,
  getUserId,
  getUserEmail,
  getUserRole,
  getAuthToken,
  isAuthenticated,
  isAdmin,
  isUser
}
