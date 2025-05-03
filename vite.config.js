import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.foodsafetykorea.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/7109179c29414b97985b'), // API key 포함
        secure: false,
      },
    },
  },
});
