import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import prerender from 'vite-plugin-prerender' // 👈 nuevo import

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    prerender({
      staticDir: 'dist',
      routes: [
        '/',
        '/about',
        '/matriculate',
        '/rendir-test',
        '/aula-virtual',
        '/cursos'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
