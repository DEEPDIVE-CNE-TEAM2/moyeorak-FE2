import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    appType: 'spa',
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        input: '/index.html',
      },
    },
  };
});
