import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // bind to all network interfaces
    port: 3000,       // ensure it's using port 3000
    strictPort: true  // prevent Vite from switching to another port if 3000 is occupied
  }
})
