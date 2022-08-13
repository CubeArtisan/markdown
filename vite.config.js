import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line no-restricted-imports, import/extensions
import { peerDependencies, dependencies } from './markdown/package.json';

const FORMAT_MAP = {
  es: 'mjs',
  cjs: 'cjs',
  umd: 'umd.cjs',
};

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, 'markdown/index.ts'),
      name: '@cubeartisan/markdown',
      fileName: (format) => `cubeartisan-markdown.${FORMAT_MAP[format]}`,
    },
    outDir: 'markdown/dist',
    minitfy: 'esbuild',
    output: {
      exports: 'named',
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
      output: {
        exports: 'named',
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [react()],
});
