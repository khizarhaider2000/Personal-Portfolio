import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',   // ✅ this is the key line — makes all asset paths relative
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
