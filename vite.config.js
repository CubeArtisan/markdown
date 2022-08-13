import { resolve } from 'path';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'markdown/index.ts'),
      name: '@cubeartisan/markdown',
      fileName: '@cubeartisan/markdown',
    },
    rollupOptions: {
      plugins: [peerDepsExternal()],
  output: {
    exports: 'named',
  },
    },
  },
  plugins: [react()],
});
