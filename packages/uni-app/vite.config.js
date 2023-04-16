import { defineConfig } from 'vite'
import { alias } from '../../scripts'

import uni from '@dcloudio/vite-plugin-uni'
import copy from 'rollup-plugin-copy'

export default defineConfig(async ({ command, mode }) => {
  const docsBuild = {};
  const targets = [];
  if (mode === 'docs') {
    docsBuild.base = './'
    targets.push({ src: 'dist/build/h5', dest: '../../docs/.vitepress/dist', rename: 'uni-app' })
  }
  return {
    server: {
      port: '3533'
    },
    plugins: [
      uni(),
      copy({
        targets
      })
    ],
    build: {
      rollupOptions: {
        external: ['uni-app', 'vue']
      },
      // lib: {
      //   entry: path.resolve(__dirname, './components/index.js'),
      //   name: 'AiUi',
      //   fileName: 'ai-uni-app',
      //   formats: ['es', 'cjs', 'umd', 'iife']
      // }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})
