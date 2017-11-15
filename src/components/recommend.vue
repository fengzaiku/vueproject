<template>
	<section class="recommend">
	    <swiper :options="myRecommendSwiper" ref="recommendMwiper" class="Rank">
	    	<swiper-slide>
				<carousel :options="myCarouselSwiper" class="carousel-swiper" ref="carouselSwiper">
					<carousel-slide  v-for="item in focus">
						<img class="recommand-swiper-img" :src="item.pic" @click="jump(item.id)">
					</carousel-slide>
					<div class="mypagination" slot="pagination"></div>
				</carousel>
				<div class="hotKey">
					<h2>热门歌单</h2>
					<ul class="hotSongList">
						<li v-for="item in hotdiss" @touchend.prevent="jumpPage(item.dissid)">
							<div class="songListLeft">
								<img :src="item.imgurl" alt="">
								<p>
									<img src="../assets/image/icon-erji.svg" alt="">
									<span>{{item.listennum | listSum}}</span>
								</p>
							</div>
							<figure class="songListRight">
								<figcaption>{{item.dissname}}</figcaption>
								<address>{{item.author}}</address>
							</figure>
						</li>
					</ul>
				</div>
				<ul class="mvSongList">
					<li v-for="item in shoubomv" @touchend.prevent="openMove(item.vid)">
					<!-- singer_mid跳转id -->
						<div class="mvListLeft">
							<img :src="item.picurl">
						</div>
						<div class="mvListRight">
							<h3>{{item.mvtitle}}</h3>
							<p>{{item.singer_name}}</p>
							<p>发行时间:{{item.pub_date}}</p>
							<p>播放量:{{item.listennum | listSum}}</p>
						</div>
					</li>
				</ul>
	    	</swiper-slide>
		 </swiper>
	</section>
</template>

<script type="text/ecmascript-6">
import Vue from "vue"

import {swiper,swiperSlide} from "vue-awesome-swiper"
import * as element from "vue-awesome-swiper"



export default {
 props:["animation"],
 components:{
 	carousel:swiper,
 	carouselSlide:swiperSlide,
    swiper,
    swiperSlide
  },
  data(){
  	return {
  		focus:[],
  		hotdiss:[],
  		shoubomv:[],
  		translate:0,
  		myRecommendSwiper:{
  			notNextTick: true,
			   direction: 'vertical',
	        slidesPerView: 'auto',
	        mousewheelControl: true,
	        freeMode: true
  		},
  		myCarouselSwiper:{
  			notNextTick: true,
  			pagination:'.mypagination',
  			paginationClickable:true,
  			preventClicks:false
  		}
  	}
  },
  computed:{
  	swiper(){
  		return this.$refs.recommendMwiper.swiper;
  	},
  	swipeCarouse(){
  		return this.$refs.carouselSwiper.swiper;
  	}
  },
  methods:{
  	jump(option){
  		/*const re=/^https?:\/\/([a-zA-Z0-9-]+.?|\/)+.html$/i;匹配输入的是否为中文*/
  		const re=/^https?:\/\/([a-zA-Z0-9-]+\.?|\/?)+/i;
  		console.log(option)
  		if(!re.test(option)){
  			this.$router.push({name:"album",params:{id:option}});
  		}else{
  			window.open(option,'_blank');
  		}		
  	},
  	openMove(id){
  		if(this.translate==this.swiper.translate && this.animation.mySwiper.swiper.animate){
  			window.open("https://y.qq.com/portal/mv/v/" +id + ".html")
  		}else{
  			this.translate=this.swiper.translate;
  		}
  	},
  	jumpPage(id){
  		this.$emit("transtions");
  		if(this.translate==this.swiper.translate && this.animation.mySwiper.swiper.animate){
  			this.$router.push({name:'song',params:{id:id}})
  		}else{
  			this.translate=this.swiper.translate;
  		}
  	}
  },
  filters:{
  	listSum(num){
  		return parseFloat(num/10000).toFixed(1)+"万"
  	}
  },
  created:function(){
  	var that=this;
	this.$store.dispatch("getRecommands").then(function(response){
		that.focus=response.data.data.focus;
		that.hotdiss=response.data.data.hotdiss.list;
		that.shoubomv=response.data.data.shoubomv.all;
	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/recommend.css';
</style>







