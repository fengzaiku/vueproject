<template>
    <swiper :options="myRankSwiper" ref="rankMwiper" class="Rank">
    	<swiper-slide>
    	<ul class="RanList">
    		<li v-for="item in topList" @touchend.prevent="jumpPage(item.id)">
    			<div class="rankLest">
    				<img :src="item.picUrl" alt="">
    				<span>{{item.listenCount | filcount}}</span>
    			</div>
    			<dl class="rankRight">
    				<dt>{{item.topTitle}}</dt>
    				<dd v-for="(list,index) in item.songList">
    					<span>{{index+1}}</span>
						<span>{{list.songname}}</span>
    					<address>-{{list.singernam}}</address>
    				</dd>
    			</dl>
    		</li>
    	</ul>
    	</swiper-slide>
  </swiper>
</template>

<script type="text/ecmascript-6">
import {swiper,swiperSlide} from "vue-awesome-swiper"
import * as element from "vue-awesome-swiper"
export default {
  props:["animation"],
 components:{
    swiper,
    swiperSlide
  },
  data(){
  	return {
        topList:[],
        translate:0,
    		myRankSwiper:{
          notNextTick: true,
  			  direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true
    		}
  	}
  },
  created:function(){
    var that=this;
    this.$store.dispatch("getRankList").then(function(response){
        that.topList=response.data.data.topList;
    });
  },
  computed:{
    swiper(){
     return this.$refs.rankMwiper.swiper;
    }
  },
  methods:{
    jumpPage(id){
        if(this.translate==this.swiper.translate && this.animation.mySwiper.swiper.animate){
          this.$router.push({name:'rank',params:{id:id}})
        }else{
          this.translate=this.swiper.translate;
        }
      }
  },
  filters:{
    filcount:function(num){
        return parseFloat(num/10000)+"万"; 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/rank.css';
</style>
