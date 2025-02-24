import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
	proxy: {
		'/api': 'https://portfolio-analyzer-9aa13095c684.herokuapp.com'
	}
  }
})
