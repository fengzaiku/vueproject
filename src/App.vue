<template>
  <div id="app">
    <!-- 顶部导航操作模块 -->
    <header-box 
    @searchShow="homeShow=false" 
    @searchHide="homeShow=true" 
    @musicActionShow="musicAction=true">
    </header-box>

    <!-- 路由模块 -->
    <router-view 
    v-if="homeShow" 
    @background="headerBackground" 
    @musicActionShow="musicAction=true">
    </router-view>
    <!-- 底部播放模块 -->
    <play-bar></play-bar>
    <!-- 音乐操作比如下一曲、当前歌曲的详细信息 -->
    <music-action 
    v-if="musicAction" 
    @musicActionhide="musicAction=false">
    </music-action>
  </div>
</template>

<script type="text/ecmascript-6">
  
  import HeaderBox from './components/header'
  import PlayBar from './components/play'
  import MusicAction from './components/musicAction'
  import {mapActions,mapGetters,mapState,mapMutations} from "vuex"
  
  export default {
    components:{
      HeaderBox,
      PlayBar,
      MusicAction
    },
    data(){
      return {
        homeShow:true,
        musicAction:false,
        albumListShow:true,
        headerColor:"rgba(255,255,255,.0)"
      }
    },
    methods:{
      headerBackground:function(val){
        console.log(123123)
      }
    }
  }
</script>
  <!--  
    @import './assets/styleSheet/home.less'
  -->
<style>
  @import './assets/styleSheet/base.css'
</style>
