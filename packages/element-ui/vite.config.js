import * as path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import { alias } from '../../scripts'
import { defineConfig } from 'vite'

export default defineConfig(async ({ command, mode }) => {
  let docsBuild = {}
  if (mode === 'docs') {
    docsBuild.base = './'
    docsBuild.build = {
      outDir: '../../docs/.vitepress/dist/element-ui'
    }
  }
  return {
    server: {
      host: '0.0.0.0',
      port: '3633'
    },
    plugins: [
      createVuePlugin()
    ],
    build: {
      rollupOptions: {
        external: ['element-ui', 'vue']
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.js'),
        name: 'AiUi',
        fileName: 'ai-element-ui',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})

