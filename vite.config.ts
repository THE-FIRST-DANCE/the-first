import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@context',
        replacement: resolve(__dirname, 'src/context'),
      },
      {
        find: '@provider',
        replacement: resolve(__dirname, 'src/provider'),
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, 'src/assets'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: '@services',
        replacement: resolve(__dirname, 'src/services'),
      },
      {
        find: '@interfaces',
        replacement: resolve(__dirname, 'src/interfaces'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, 'src/styles'),
      },
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    proxy: {
      '/naver': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naver/, ''),
      },
    },
  },
});
