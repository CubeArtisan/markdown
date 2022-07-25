import { resolve } from 'path';

import eslint from '@vitejs/plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: '@cubeartisan/markdown',
      fileName: '@cubeartisan/markdown',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
  },
  plugins: [
    eslint(),
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint index.ts "components/**/*{.ts,tsx}" "plugins/**/*{.ts,tsx}',
      },
    }),
  ],
});
