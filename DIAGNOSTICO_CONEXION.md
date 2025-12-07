# 🔧 Diagnóstico de Problemas de Conexión

## ❌ Problema: "No está conectando con el servidor"

### 🔍 Diagnóstico Paso a Paso

#### 1. **Verificar que el servidor esté activo**

Abre una terminal y ejecuta:
```bash
curl https://gateway.helmer-pardo.com/auth/login
```

**Respuestas posibles:**
- ✅ Si responde (aunque sea con error): El servidor está activo
- ❌ Si no responde: El servidor está caído o la URL es incorrecta

---

#### 2. **Probar el login con curl**

```bash
curl -X POST https://gateway.helmer-pardo.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juancamilo12344@gmail.com",
    "password": "TU_PASSWORD_AQUI"
  }'
```

**Respuestas esperadas:**
- ✅ Status 200 + Token: Login exitoso
- ❌ Status 401: Credenciales incorrectas
- ❌ Status 500: Error del servidor (problema en el backend)
- ❌ No conecta: Problema de red o servidor caído

---

#### 3. **Probar en Postman**

1. Abre Postman
2. Crea una request POST: `https://gateway.helmer-pardo.com/auth/login`
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (raw - JSON):
   ```json
   {
     "email": "juancamilo12344@gmail.com",
     "password": "tu_password"
   }
   ```
5. Click "Send"

**¿Qué ves?**
- ✅ 200 OK con token: Servidor funciona
- ❌ 500 Internal Server Error: Backend tiene problemas
- ❌ Could not get response: Problema de red/CORS

---

#### 4. **Verificar en el Navegador**

1. Abre tu app: `http://localhost:5174`
2. Abre la consola (F12)
3. Intenta hacer login
4. Revisa los mensajes en la consola:

**Mensajes que verás:**
```
🔄 Intentando conectar con el servidor...
📧 Email: usuario@ejemplo.com
📡 Respuesta del servidor - Status: XXX
```

**Interpretación:**
- `Status: 200` ✅ Login exitoso
- `Status: 401` ❌ Contraseña incorrecta
- `Status: 500` ❌ Error del servidor (problema en backend)
- `Failed to fetch` ❌ No puede conectar (red/CORS/servidor caído)

---

### 🛠️ Soluciones Comunes

#### ❌ Error: "Status: 500 - Internal Server Error"

**Problema:** El backend tiene un error interno

**Soluciones:**
1. Verifica que la base de datos esté activa
2. Revisa los logs del servidor backend
3. Verifica que todos los servicios estén corriendo
4. Contacta al equipo de backend

---

#### ❌ Error: "Failed to fetch" o "Network error"

**Problema:** No puede conectar con el servidor

**Soluciones:**
1. Verifica tu conexión a internet
2. Verifica que la URL sea correcta: `https://gateway.helmer-pardo.com`
3. Verifica que el servidor esté en línea
4. Verifica problemas de CORS en el backend

---

#### ❌ Error: "CORS policy blocked"

**Problema:** El servidor no permite peticiones desde tu dominio

**Solución:** El backend debe agregar:
```javascript
// En el backend (Node.js/Express)
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'],
  credentials: true
}))
```

---

### 🧪 Test Manual en la Consola del Navegador

Abre la consola (F12) y ejecuta:

```javascript
// Test básico
fetch('https://gateway.helmer-pardo.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'juancamilo12344@gmail.com',
    password: 'tu_password'
  })
})
.then(res => {
  console.log('Status:', res.status)
  return res.json()
})
.then(data => console.log('Data:', data))
.catch(err => console.error('Error:', err))
```

---

### 📋 Checklist de Verificación

- [ ] El servidor está activo (curl responde)
- [ ] La URL es correcta: `https://gateway.helmer-pardo.com`
- [ ] Las credenciales son correctas
- [ ] No hay errores de CORS
- [ ] El backend está funcionando correctamente
- [ ] La base de datos está activa
- [ ] El token se genera correctamente en el backend

---

### 🆘 Si Nada Funciona

1. **Verifica con el equipo de backend:**
   - ¿El servidor está activo?
   - ¿Hay algún mantenimiento?
   - ¿Los endpoints están correctos?
   - ¿Hay problemas con la base de datos?

2. **Usa credenciales de prueba:**
   ```json
   {
     "email": "test@test.com",
     "password": "test123"
   }
   ```

3. **Activa el modo desarrollo en la consola:**
   - Ve a Network (Red)
   - Haz login
   - Mira la request y response completas

---

### 📞 Contacto

Si el problema persiste:
1. Captura de pantalla de la consola (F12)
2. Captura del Network tab mostrando la request
3. Mensaje de error completo
4. Contacta al equipo de backend con esta información
