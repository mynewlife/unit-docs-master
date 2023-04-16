import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'
import { demoBlockPlugin } from '../build/demoblock/index'
// import { mdPlugin } from './configs/plugins'

const base = '/'

export default defineConfig({
  title: '组件库',
  description: '',
  appearance: false,
  base,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/favicon.ico',
    nav,
    sidebar,
    footer
  },
  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin, {
        customClass: 'demoblock-custom',
        cssPreprocessor: 'scss',
        // customStyleTagName: 'style lang="less"',
        scriptImports: ["import * as ElementPlus from 'element-plus'"],
        scriptReplaces: [
          { searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
            replaceValue: 'const { defineComponent: _defineComponent } = Vue'
          },
          { searchValue: /import ({.*}) from 'element-plus'/g,
            replaceValue: (s:any, s1:any) => `const ${s1} = ElementPlus`
          }
        ],
      })
    }
  }
})
