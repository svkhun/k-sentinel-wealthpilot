import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/app': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/dashboard': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/simulation': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/static': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/predict': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/forecast': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
});
