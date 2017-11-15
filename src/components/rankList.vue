<template>
  <section class="songMenu">
    <div class="menuListBox">
    	<img :src="imgUrl" class="singleBg">
    	<swiper :options="swiperOption" ref="mySwiper">
    		<swiper-slide v-if="songListData!=null">
    			<div class="header-blank"></div>
    			<div class="menuHeader" :style="{background:background}">
    				<div>
    					<h3>{{songListData.topinfo.ListName}}</h3>
    					<p>{{songListData.topinfo.listennum | filNumber}}万</p>
    				</div>
    				<img src="../assets/image/icon-play.png" alt="" @touchend.prevent="playSongIndex(0)">
    			</div>
    			<ul class="menuList" :style="{background:color}">
    				<li v-for="(item,index) in songListData.songlist" >
              <b>{{index+1}}</b>
    					<div>
    						<h3  @touchend.prevent="playSongIndex(index)">{{item.data.songorig}}</h3>
    						<p>
    							<span v-for="singerName in item.data.singer">{{singerName.name}}</span>
    							<span>{{item.data.albumname}}</span>
    						</p>
    					</div>
    					<img src="../assets/image/icon-...black.png" alt="" @touchend.prevent="munueAction">
    				</li>
     			</ul>
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
        songListData:null,
        songList:[],
        translate:0,
  		  swiperOption:{
            notNextTick: true,
    	      direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            preventClicksPropagation:true,
            longSwipesRatio:0
  		}
  	}
  },
  computed:{
    color(){
      var that=this;
        if(this.songListData!=null){
             var colorString="000"+that.songListData.color.toString(16);
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
    background: function () {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.opacity + ')'
      },
    swiper() {
        return this.$refs.mySwiper.swiper
    },
    opacity(){       
        return this.offsetTop/173;
    },
    imgUrl(){
      if(this.songListData!=null){
        return this.songListData.topinfo.pic_album
      }
    }
  },
  created:function(){
    var that=this; 
    this.$store.dispatch('getRankSongs',this.$route.params.id).then((response) => {
        that.songListData=response.data;
        response.data.songlist.forEach(function(item,index){
            that.songList.push({
              id: item.data.songid,
              mid: item.data.songmid,
              name: item.data.songorig,
              singer: item.data.singer,
              albummid: item.data.albummid
            });
        });
      })
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
