# 引入

## 完整引入
``` js
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'//√
import 'element-plus/dist/index.css'//√
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
//  createApp(App).use(ElementPlus).mount('#app')
```


## 按需导入 <font color=#FFF size=3  style=background:#409eff>推荐</font>
### 首先你需要安装 <font color=#409eff>unplugin-vue-components</font> 和 <font color=#409eff>unplugin-auto-import</font> 这两款插件
```
npm install -D unplugin-vue-components unplugin-auto-import
```
### 然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中
* Webpack
``` js
// webpack.config.js
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}) 
```



*  Vite
``` js
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

