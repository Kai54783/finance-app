import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Vercel 需要這個來識別 build 輸出
  },
  server: {
    historyApiFallback: true, // 讓 Vercel 知道要將所有路由指向 index.html
  },
});
