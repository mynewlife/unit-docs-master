<template>
  <mapTrack :carArr="features" />
</template>

<script>
import mapTrack from "@/components/map/track";
export default {
  name:'track',
  components:{mapTrack},
  data() {
    return {
      title: 'Hello',
      features: [[
        116.26802,39.90623
      ],[
        116.28896,39.90622
      ],[
        116.30421,39.90625
      ],[
        116.3155,39.90618
      ],[
        116.3313,39.90611
      ],[
        116.34643,39.90583
      ],[
        116.35033,39.90582
      ],[
        116.36784,39.90579
      ],[
        116.36755,39.91449
      ],[
        116.36755,39.91449
      ],[
        116.36673,39.93235
      ],[
        116.36651,39.93924
      ],[
        116.36172,39.93923
      ],[
        116.34936,39.93913
      ],[
        116.33292,39.93697
      ],[
        116.319550,39.931000
      ]]
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
</style>