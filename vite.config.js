/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
})
*/
// ---------------------

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.moyeorak.cloud',
        changeOrigin: true,
        secure: true,  // https 사용시 true, http면 false
      },
    },
  },
})

//------------------------
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/', // ← 빌드 시 JS/CSS 경로 기준을 /admin으로 변경
  server: {
    proxy: {
      '/api': {
        target: 'https://api.moyeorak.cloud',
        changeOrigin: true,
        secure: true,  // https 사용시 true, http면 false
      },
    },
  },
});
*/
