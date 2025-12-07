# 🔴 Solución: Error "Failed to fetch"

## ❌ Error Recibido:
```
TypeError: Failed to fetch
```

## 🔍 ¿Por qué ocurre?

El error "Failed to fetch" puede ocurrir por **4 razones principales**:

### 1. **Problema de CORS** (Más común)
El servidor `https://gateway.helmer-pardo.com` no tiene configurado CORS para aceptar peticiones desde tu dominio local (`http://localhost:5174`).

### 2. **Servidor caído o no disponible**
El servidor no responde o está en mantenimiento.

### 3. **Problema de red**
Tu conexión a internet tiene problemas o hay un firewall bloqueando.

### 4. **Configuración SSL/HTTPS**
Problemas con certificados SSL del servidor.

---

## ✅ Soluciones Implementadas

### 1. **Mejora en el servicio API** (`api.js`)
- ✅ Timeout de 10 segundos
- ✅ Mejores mensajes de error
- ✅ Configuración de CORS
- ✅ Manejo de errores específicos

### 2. **Modo Desarrollo** (`devMode.js`)
- ✅ Permite probar la app sin backend
- ✅ Credenciales de prueba
- ✅ Simula latencia de red

### 3. **Botón de Emergencia en Login**
- ✅ Si falla la conexión, aparece botón "Activar Modo Desarrollo"
- ✅ Permite seguir trabajando en el frontend

---

## 🛠️ Cómo Usar el Modo Desarrollo

### Opción 1: Activar desde el Login
1. Intenta hacer login
2. Si falla, aparece el botón "🔧 Activar Modo Desarrollo"
3. Click en el botón
4. Usa las credenciales de prueba:
   - Email: `cualquier_email@test.com`
   - Password: `dev123`

### Opción 2: Activar permanentemente
En `src/services/devMode.js`:
```javascript
const DEV_MODE = true  // Cambiar a true
```

### Credenciales de prueba:
```
Admin:
- Email: admin@godeye.com
- Password: admin123

Usuario normal:
- Email: cualquier_email@test.com
- Password: dev123
```

---

## 🔧 Soluciones para el Servidor Real

### Solución 1: Configurar CORS en el Backend

El backend debe agregar estos headers:

**Node.js/Express:**
```javascript
const cors = require('cors')

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

**NestJS:**
```typescript
app.enableCors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
})
```

### Solución 2: Usar un Proxy

En `vite.config.js`:
```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://gateway.helmer-pardo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

Luego cambiar en `api.js`:
```javascript
const API_BASE_URL = '/api'  // En lugar de la URL completa
```

### Solución 3: Extensión de Chrome para CORS (Solo desarrollo)

1. Instalar extensión: "Allow CORS: Access-Control-Allow-Origin"
2. Activarla
3. Recargar la página
4. **⚠️ SOLO para desarrollo, NO para producción**

---

## 🧪 Verificar si es problema de CORS

En la consola del navegador (F12), busca este error:
```
Access to fetch at 'https://gateway.helmer-pardo.com/auth/login' 
from origin 'http://localhost:5174' has been blocked by CORS policy
```

Si ves ese mensaje = **Es problema de CORS en el backend**

---

## 📞 Contactar al Backend

Si el error persiste, envía este mensaje al equipo de backend:

```
Hola,

Estoy teniendo problemas de CORS al conectar desde el frontend 
(http://localhost:5174) al endpoint:
POST https://gateway.helmer-pardo.com/auth/login

Error recibido: "Failed to fetch"

Por favor, agregar estos orígenes en la configuración de CORS:
- http://localhost:5173
- http://localhost:5174
- http://localhost:3000

Gracias!
```

---

## ✅ Verificación de Solución

### Desde la terminal:
```bash
curl -X POST https://gateway.helmer-pardo.com/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5174" \
  -d '{"email":"test@test.com","password":"test"}' \
  -v
```

Si funciona en curl pero no en el navegador = **Problema de CORS**

---

## 🎯 Recomendación

**Para seguir desarrollando AHORA:**
1. Usa el Modo Desarrollo
2. Contacta al backend para configurar CORS
3. Una vez configurado CORS, desactiva el Modo Desarrollo

**El Modo Desarrollo es TEMPORAL, solo para no bloquear tu trabajo mientras se soluciona el backend.**
