<template>
  <view class="ai-pick">
    <view class="search-box">
      <input v-model="inpVal" class="search-input" placeholder="输入关键字选取地址" @input="updInput" />
      <view class="search-but" @click="search">搜索</view>
    </view>
    <view>
      <view v-for="(item,index) in list" :key="index" class="sugg-item" @click="handleSelect(item)">
        <text class="sugg-name">{{item.name}}</text>
        <text class="sugg-address">{{item.address}}</text>
      </view>
    </view>
    <view id="container" class="map">
      <image class="map-img" :src="img"></image>
    </view>
    <view class="address-box">
      <view class="address-info">{{address.address}}</view>
      <view class="address-but" @click="handleAddress">确认地址</view>
    </view>
  </view>
</template>
<script>
import {MapLoader,mapUrl,version} from "./map";

export default {
  props:{
    zoom:{
      type: Number,
      default: 16
    },
    intLngLat:{
      type:Array,
      default: ()=>[104.062269,30.661123]
    }
  },
  data(){
    return {
      inpVal:"",
      list:[],
      map:null,
      localsearch:null,
      geocoder:null,
      timeId:null,
      img:mapUrl + '/v'+version+'/image/marker-icon.png',
      address:{}
    }
  },
  mounted(){
    this.init();
  },
  beforeDestroy(){
    this.removeMapMoveend();
  },
  methods:{
    // 地图初始化
    async init(){
      await MapLoader();

      //初始化地图对象
      this.map = new T.Map("container");
      //设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(this.intLngLat[0],this.intLngLat[1]), this.zoom);
      //允许鼠标滚轮缩放地图
      this.addMapMoveend();
    },
    localSearchResult(result){

      // console.log(result)
      // console.log(result.getResultType())

      //根据返回类型解析搜索结果
      switch (parseInt(result.getResultType())) {
        case 1:
          //解析点数据结果
          // console.log(result.getPois());
          this.list = result.getPois();
          break;
        // case 2:
        //   //解析推荐城市
        //   console.log(result.getStatistics());
        //   break;
        // case 3:
        //   //解析行政区划边界
        //   console.log(result.getArea());
        //   break;
        // case 4:
        //   //解析建议词信息
        //   console.log(result.getSuggests());
        //   break;
        // case 5:
        //   //解析公交信息
        //   console.log(result.getLineData());
        //   break;
      }
    },
    // 地址搜索
    updInput(e){
      if(!this.localsearch){
        if(!this.map) return;
        const config = {
          pageCapacity: 10,	//每页显示的数量
          onSearchComplete: this.localSearchResult	//接收数据的回调函数
        };
        //创建搜索对象
        this.localsearch = new T.LocalSearch(this.map, config);
      }
      if(this.timeId){
        clearTimeout(this.timeId)
      }
      this.timeId=setTimeout(()=>{
        this.timeId=null;
        if(!this.localsearch || this.inpVal.length<2) return;
        this.localsearch.search(this.inpVal,1);
      },1000)
    },
    // 点击搜索按钮
    search(){
      if(!this.map || this.inpVal.length<2) return;
      if(!this.geocoder) this.geocoder = new T.Geocoder();
      this.map.clearOverLays();
      this.geocoder.getPoint(this.inpVal, (result)=>{
        if(result.getStatus() == 0){
          this.map.panTo(result.getLocationPoint(), this.zoom);
          console.log(result)
        }
      });
    },
    handleSelect(row){
      if(row.lonlat){
        const lnglatArr = row.lonlat.split(" ");
        const lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
        this.map.panTo(lnglat, this.zoom);
        this.list=[];
        this.address={...row,lonlat:lnglatArr}
      }
    },
    // 添加拖拽地图监听中心经纬度
    addMapMoveend() {
      if(!this.map) return;
      this.map.addEventListener("moveend", this.MapMoveend);
    },
    //移除地图的移动停止事件
    removeMapMoveend() {
      if(!this.map) return;
      this.map.removeEventListener("moveend", this.MapMoveend);
    },
    MapMoveend({target}) {
      //创建对象
      if(!this.geocoder) this.geocoder = new T.Geocoder();
      const lnglat = target.getCenter();
      this.geocoder.getLocation(lnglat,(result)=>{
        if(result.getStatus() == 0){
          this.address=Object.assign({lnglat:[lnglat.getLng(),lnglat.getLat()]},result.getAddressComponent())
        }
      });
    },
    handleAddress(){
      if(!this.address || Object.keys(this.address).length===0){
        uni.showToast({
          title: '请选择地址',
          duration: 2000
        });
        return;
      }
      this.$emit('getAddress',this.address);
    }
  }
}
</script>

<style scoped>
.ai-pick{
  height: 100%;
}
.search-box{
  display: flex;
  height: 80rpx;
  padding: 16rpx 0;
  background-color: #fff;

}
.search-input{
  flex: 1;
  height: 100%;
  border-radius: 40rpx;
  font-size: 24rpx;
  color: #353535;
  background-color: #f3f3f3;
  padding: 0 20rpx;
  margin-left: 2%;
}
.search-but{
  width: 16%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
  color: #2091db;
}
.sugg-item{
  margin: 0;
  border-bottom: 1rpx solid #eee;
  font-size: 28rpx;
  padding: 10rpx 10rpx;
  vertical-align: middle;
  cursor: pointer;
}
.sugg-address{
  font-size: 90%;
  color: #999;
  margin-left: 5px;
}
.map{
  width: 750rpx;
  height: calc(100% - 80rpx);
  position: relative;
}
.map-img{
  position: absolute;
  bottom: 50%;
  right: calc(50% - 12rpx);
  width: 25rpx;
  height: 41rpx;
  z-index: 899;
}
.address-box{
  position: fixed;
  bottom: 10rpx;
  left: 10rpx;
  right: 10rpx;
  height: 100rpx;
  z-index: 888;
  display: flex;
  align-items: center;
  border-radius: 50rpx;
  background-color: #fff;
}
.address-info{
  flex: 1;
  font-size: 24rpx;
  padding-left: 20rpx;
}
.address-but{
  width: 200rpx;
  height: 60rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
  background-color: #007aff;
  color: #fff;
  margin: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>