<template>
  <section class="songMenu">
    <div class="menuListBox">
    	<img :src="cdList.logo" alt="" class="singleBg">
    	<swiper :options="swiperOption" ref="mySwiper">
    		<swiper-slide>
    			<div class="header-blank"></div>
    			<div class="menuHeader" :style="{background:background}">
    				<div>
    					<h3>{{cdList.dissname}}</h3>
    					<p>{{cdList.visitnum | filNumber}}万播放 来自：{{cdList.nickname}}</p>
    				</div>
    				<img src="../assets/image/icon-play.png" alt="" @touchend="playSongIndex(0)">
    			</div>
    			<ul class="menuList" :style="{background:color}">
    				<li v-for="(item,index) in cdList.songlist" >
    					<div>
    						<h3  @touchend.prevent="playSongIndex(index)">{{item.name}}</h3>
    						<p>
    							<span v-for="singerName in item.singer">{{singerName.name}}</span>
    							<span v-if="cdList.subtitle">-{{cdList.subtitle}}</span>
    						</p>
    					</div>
    					<img src="../assets/image/icon-...black.png" alt="" @touchend.prevent="munueAction">
    				</li>
     			</ul>
    			<div class="meunExpress" :style="{background:color}">
    				<h3>简介</h3>
    				<p>{{cdList.desc}}</p>
    			</div>
    		</swiper-slide>
    	</swiper>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {swiper,swiperSlide} from "vue-awesome-swiper"
const colorJson={};
export default {
  components:{
  	swiper,
  	swiperSlide
  },
  data(){
  	return {
        cdList:[],
        songList:[],
        translate:0,
    		swiperOption:{
            notNextTick: true,
  		       direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            preventClicksPropagation:true,
            longSwipesRatio:0,
            onScroll:function(swiper){
                document.querySelector(".header").style.background="rgb("+colorJson.r+","+colorJson.g+","+colorJson.r+")"
                swiper.emit("event",swiper.translate)
            }
    		}
  	}
  },
  computed:{
    color(){
        if(this.cdList.uin){
             var colorString="000"+this.cdList.uin.toString(16);
             return "#"+colorString.substr(colorString.length-6);
        }else{
            return "#fff"
        }
    },
    background(){
        return '-webkit-linear-gradient(top, rgba(255, 255, 255, 0), '+this.color+')';
    },
    r(){
        return this.color.slice(1,3).toString(16);
    },
    g(){
        return this.color.slice(3,5).toString(16);
    },
    b(){
        return this.color.slice(5,7).toString(16);
    },
    swiper() {
        return this.$refs.mySwiper.swiper
    },
    opacity(){       
        return this.offsetTop/173;
    }
  },
  watch:{
   
  /*
    offsetTop(val){
        this.$emit("background",'rgba('+this.r+','+this.g+','+this.b+','+this.opacity+')')
    }*/
  },
  created:function(){
    var that=this; 
    this.$store.dispatch("getCdList",this.$route.params.id).then((response)=>{
        that.cdList=response.data.cdlist[0];
        response.data.cdlist[0].songlist.forEach(function(ele,index){
            that.songList.push({
                name:ele.name,
                id:ele.id,
                mid:ele.mid,
                singer:ele.singer[0].name
            });
        });
    });
    colorJson.r=this.color.slice(1,3).toString(16);
    colorJson.g=this.color.slice(3,5).toString(16);
    colorJson.b=this.color.slice(5,7).toString(16);
  },
  filters:{
    filNumber(num){
        return (parseFloat(num)/10000).toFixed(2)+'万';
    }
  },
  methods:{
        playSongIndex(index){
          if(this.translate==this.swiper.translate){
            this.$store.commit("playSong",{index:index,list:this.songList});
          }else{
            this.translate=this.swiper.translate;
          }
        },
        munueAction(){
            this.$emit("musicActionShow");
        }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/songMenu.css';
</style>
