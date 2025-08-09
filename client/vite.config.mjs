import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Make sure this is 'build'
    emptyOutDir: true // Clean the folder before build
  },
  server: {
    port: 3000,
    open: true,
  },
})
