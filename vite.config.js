import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { prototype } from 'events'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      // 如果你有接口代理需求再在这里配置
        "/api": {
          target:"http://159.75.169.224:1235"
      // '/api': 'http://localhost:8080'
    }
  }
} 
})