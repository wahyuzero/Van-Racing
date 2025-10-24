import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // 🔑 biar host random dari tunnel gak diblok
    allowedHosts: true, 
    // optional: bisa juga set host & port custom
    host: '0.0.0.0',
    port: 5173,
  },
})
