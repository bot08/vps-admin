import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile()
  ],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://192.168.50.224:4321/',
        changeOrigin: true,
      },
    },
  },
})
