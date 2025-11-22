import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Importante

export default defineConfig({
  base: '/giftminder/',
  plugins: [
    react(),
    tailwindcss(), // <--- Importante
  ],
})