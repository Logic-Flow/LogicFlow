import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import examplesConfig from './scripts/rollup-plugin-config/rollup-plugin-config-json';
import playgroundJson from './scripts/rollup-plugin-playground/rollup-plugin-playground-json';
// import screenshotPlugin from './scripts/rollup-plugin-screenshot/rollup-plugin-screenshot';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            [
              'playground-preview',
              'playground-project',
              'playground-file-editor',
              'playground-tab-bar',
            ].includes(tag),
        },
      },
    }),
    examplesConfig(),
    playgroundJson(),
    // screenshotPlugin(),
  ],
  server: {
    port: 5000,
    strictPort: true,
    // host: 'localhost',
    cors: true,
  },
});
