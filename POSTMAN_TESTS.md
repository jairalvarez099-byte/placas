# Pruebas de API con Postman - GODeyeScan

Base URL: `https://gateway.helmer-pardo.com`

## 1. Login de Usuario

**Endpoint:** POST `/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu_contraseña"
}
```

**Respuesta Exitosa (200):**
```json
{
  "user": {
    "id": "4a6a74a9-a459-4a68-b7df-ea9c75cbe338",
    "email": "juancamilo12344@gmail.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YTZhNzRhOS1hNDU5LTRhNjgtYjdkZi1lYTljNzVjYmUzMzgiLCJlbWFpbCI6Imp1YW5jYW1pbG8xMjM0NEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NTA3MTY1NCwiZXhwIjoxNzY1MTU4MDU0fQ.V9kiCh2LsH0VT3iUi0_nbFVNUMtnW8kW8NdlDlZ2Ekg"
}
```

**Respuesta Error (401):**
```json
{
  "message": "Credenciales incorrectas"
}
```

---

## 2. Registro de Usuario

**Endpoint:** POST `/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Nombre Completo",
  "email": "nuevo@ejemplo.com",
  "password": "contraseña123",
  "confirmPassword": "contraseña123"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "124",
    "email": "nuevo@ejemplo.com",
    "name": "Nombre Completo"
  }
}
```

---

## 3. Recuperar Contraseña

**Endpoint:** POST `/auth/reset-password`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Correo de recuperación enviado"
}
```

---

## 4. Peticiones Autenticadas

Para todas las peticiones que requieren autenticación, incluye el token en los headers:

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {tu_token_aqui}
```

### Ejemplo: Obtener Historial de Placas

**Endpoint:** GET `/api/placas/historial`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta Exitosa (200):**
```json
{
  "data": [
    {
      "id": 1,
      "placa": "ABC-1234",
      "fecha": "2024-01-15T14:30:25",
      "estado": "Robado",
      "ubicacion": "Av. Principal 123",
      "lat": 4.7110,
      "lng": -74.0721
    }
  ]
}
```

---

## Códigos de Estado HTTP

- **200 OK**: Petición exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: No tiene permisos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

---

## Variables de Entorno en Postman

1. Crear una variable `base_url` con valor: `https://gateway.helmer-pardo.com`
2. Crear una variable `auth_token` para guardar el token después del login
3. Usar `{{base_url}}` y `{{auth_token}}` en tus peticiones

### Script para guardar token automáticamente (en tab Tests del request de login):

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("auth_token", jsonData.token);
}
```

---

## Notas Importantes

- Todos los endpoints esperan JSON en el body
- El token debe incluirse en cada petición autenticada
- Los tokens pueden expirar después de cierto tiempo
- Verifica que el servidor esté disponible antes de hacer pruebas
