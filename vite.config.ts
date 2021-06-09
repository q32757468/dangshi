import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "src",
    },
  },
  server: {
    proxy: {
      // with options
      "/dangshi": {
        target: "http://dsdt.people.cn",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/dangshi/, ""),
      },
      // with RegEx
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, '')
      // }
    },
    port: 3008,
  },
});
