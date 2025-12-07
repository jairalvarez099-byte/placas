/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  // Agrega más variables de entorno aquí según las necesites
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
