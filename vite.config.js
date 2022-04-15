const { resolve } = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        plain: resolve(__dirname, 'plain/index.html'),
        isomorphic: resolve(__dirname, 'isomorphic/index.html'),
        client: resolve(__dirname, 'client/index.html'),
      },
    },
  },
  plugins: [react()],
});
