# Dashboard de Detección de Placas Robadas

Dashboard moderno para el monitoreo y detección de placas de vehículos robados.

## Características

- **Menú lateral fijo** con navegación entre secciones
- **Perfil de Usuario**: Gestión de información personal
- **Historial**: Registro completo de todas las detecciones
- **Reportes**: Generación de reportes y estadísticas
- **Cámara**: Detección en tiempo real de placas

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## Estructura del Proyecto

```
/home/jair/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Componente principal
│   │   ├── Dashboard.css
│   │   ├── Sidebar.jsx        # Menú lateral
│   │   ├── Sidebar.css
│   │   ├── Perfil.jsx         # Componente de perfil
│   │   ├── Perfil.css
│   │   ├── Historial.jsx      # Componente de historial
│   │   ├── Historial.css
│   │   ├── Reportes.jsx       # Componente de reportes
│   │   ├── Reportes.css
│   │   ├── Camara.jsx         # Componente de cámara
│   │   └── Camara.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Tecnologías

- React 18
- Vite
- CSS3 (sin frameworks adicionales)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

