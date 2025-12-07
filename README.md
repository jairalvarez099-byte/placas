# Dashboard de Detección de Placas Robadas

Dashboard moderno para el monitoreo y detección de placas de vehículos robados.

## Características

- **Menú lateral fijo** con navegación entre secciones
- **Perfil de Usuario**: Gestión de información personal
- **Historial**: Registro completo de todas las detecciones con **mapa de geolocalización** para rastrear rutas de vehículos
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
- Leaflet & React-Leaflet (para mapas de geolocalización)
- CSS3 (sin frameworks adicionales)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Despliegue

### Opción 1: Vercel (Recomendado)

1. Instala Vercel CLI globalmente:
```bash
npm i -g vercel
```

2. Desde la raíz del proyecto, ejecuta:
```bash
vercel
```

3. Sigue las instrucciones en la terminal. Vercel detectará automáticamente la configuración.

**O despliega desde GitHub:**
- Sube tu código a GitHub
- Ve a [vercel.com](https://vercel.com)
- Importa tu repositorio
- Vercel detectará automáticamente la configuración y desplegará

### Opción 2: Netlify

1. Instala Netlify CLI globalmente:
```bash
npm i -g netlify-cli
```

2. Desde la raíz del proyecto, ejecuta:
```bash
netlify deploy --prod
```

**O despliega desde GitHub:**
- Sube tu código a GitHub
- Ve a [netlify.com](https://netlify.com)
- Importa tu repositorio
- Netlify usará automáticamente el archivo `netlify.toml`

### Opción 3: GitHub Pages

1. Instala `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Agrega estos scripts a `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Configura la base en `vite.config.js`:
```js
export default defineConfig({
  base: '/nombre-del-repositorio/',
  plugins: [react()],
})
```

4. Despliega:
```bash
npm run deploy
```

### Verificar Build Localmente

Antes de desplegar, puedes probar la versión de producción localmente:

```bash
npm run build
npm run preview
```

Esto iniciará un servidor local con la versión optimizada de producción.

