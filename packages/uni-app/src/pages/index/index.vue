<template>
  <view class="content">
    <mapPick />
  </view>
</template>

<script>
import mapPick from "@/components/map/pick";
export default {
  components:{mapPick},
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
page{
  height: 100%;
}
.content {
  height: 100%;
}
</style>
