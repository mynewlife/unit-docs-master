# Table 表格

## 自定义列表格

自定义列表格用法展示。可通过  `default-columns` 控制默认显示列，如果不传，或者传空数组，则首次加载默认加载全部列。

<ai-demo
    demo-height="270px"
    source-code="element-ui:::table/table-custom-columns"
/>

## Table 属性

如需查看 element-ui 的 Table 属性，请参考：[element-ui](https://element.eleme.cn/2.14/#/zh-CN/component/table)

| 属性                      | 说明                                                     | 类型           | 可选值     | 默认值         |
| ------------------------ | -------------------------------------------------------- | ------------- | --------- | ------------- |
| default-columns          | 自定义列模式中，默认选中的列。注意需要传入 `label` 的值          | array         | -         | []          |

:::demo

```vue
<template>
  <el-switch
      v-model='value'
      size='large'
      active-text='Open'
      inactive-text='Close'
  />
  <br />
  <el-switch v-model='value' active-text='Open' inactive-text='Close' />
  <br />
  <el-switch
      v-model='value'
      size='small'
      active-text='Open'
      inactive-text='Close'
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>
```

:::

:::demo
```vue
<template>
  <div>
    <el-checkbox v-model="checked1" label="Option 1" size="large" />
    <el-checkbox v-model="checked2" label="Option 2" size="large" />
  </div>
  <div>
    <el-checkbox v-model="checked3" label="Option 1" />
    <el-checkbox v-model="checked4" label="Option 2" />
  </div>
  <div>
    <el-checkbox v-model="checked5" label="Option 1" size="small" />
    <el-checkbox v-model="checked6" label="Option 2" size="small" />
  </div>
  <div>
    <el-checkbox v-model="checked5" label="Option 1" size="small" disabled />
    <el-checkbox v-model="checked6" label="Option 2" size="small" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>
```
:::