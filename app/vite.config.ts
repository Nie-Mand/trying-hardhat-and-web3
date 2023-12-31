import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      chain: '/src/blockchain',
      eth: '/src/eth/index.ts',
    },
  },
  plugins: [react()],
})
