import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // Configuración específica para el build
    ssrManifest: false,
    minify: true,
    target: 'esnext'
  },
  // Configuración para SSR
  ssr: {
    // Marcar vue-i18n como externo para evitar problemas
    noExternal: ['vue-i18n']
  }
})
