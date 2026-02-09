import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/birthday/',
  plugins: [react()],
  server: {
    host: true, // Allow access from network
    allowedHosts: [
      'subclavian-nichol-postvocalically.ngrok-free.dev',
      '.ngrok-free.dev', // Allow all ngrok domains
      '.ngrok.io', // Allow legacy ngrok domains
    ],
  },
})
