const { resolve } = require('path')
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        react: resolve(__dirname, 'react/index.html')
      }
    }
  },
  plugins: [react()]
})
