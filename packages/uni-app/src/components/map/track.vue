<template>
  <view class="track-box" id="container"></view>
</template>
<script>
import {MapLoader, tdUrl, gdMapKey, D3SvgOverlay, CarTrack, GetD3} from "./map";

export default {
  props:{
    zoom:{
      type: Number,
      default: 12
    },
    carArr:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      map:null,
      carTrack:null
    }
  },
  mounted(){
    if(!this.carArr || this.carArr.length===0) return;
    this.init();
  },
  beforeDestroy(){
    if(this.carTrack) this.carTrack.pause();
  },
  methods:{
    async init(){
      await Promise.all([MapLoader(),GetD3()]);
      await Promise.all([D3SvgOverlay(),CarTrack()]);

      const tile = new T.TileLayer(tdUrl('t4')+"/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk="+gdMapKey);
      this.map = new T.Map("container", {layers: [tile]});
      this.map.centerAndZoom(new T.LngLat(this.carArr[0][0], this.carArr[0][1]), this.zoom);

      const Datas = this.carArr.map(function (obj, i) {
        let lnlat = new T.LngLat(obj[0], obj[1]);
        return lnlat;
      })
      this.map.setViewport(Datas);

      /**
       * @property {Boolean} dynamicLine 是否市动态路线
       * @property {Array:[T.LngLat]} Datas 行车轨迹
       */
      this.carTrack = new T.CarTrack(this.map, {
        interval: 5,
        speed: 10,
        dynamicLine: false,
        polylinestyle: {color: "#2C64A7", weight: 5, opacity: 0.9},
        Datas,
        passOneNode:(lnglat,counter,nodeslength)=>{
          if (counter >= nodeslength) {
            this.carTrack.pause();
          }
        }
      })

      this.carTrack.start();
    }
  }
}
</script>
<style scoped>
  .track-box{
    height: 100%;
    width: 750rpx;
  }
</style>