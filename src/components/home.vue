<template>
  <section class="homeBox">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="slide-Box slide-recommend">
         <recommend :animation="isAnimate"></recommend>
      </swiper-slide>
      <swiper-slide class="slide-Box slide-rank">
        <rank :animation="isAnimate"></rank>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
 </section>
</template>

<script type="text/ecmascript-6">
import Recommend from "./recommend"
import Rank from "./rank"

import {swiper,swiperSlide} from "vue-awesome-swiper"

const TAB_LIST=['推荐','排行榜'];
export default {
  components:{
    swiper,
    swiperSlide,
    Recommend,
    Rank
  },
  data () {
    return {
        Choice:"推荐",
        swiperOption:{
          notNextTick: true,
          pagination:'.swiper-pagination',
          paginationClickable :true,
          preventClicks:true,
         /* paginationFractionRender:function (swiper, currentClassName, totalClassName){
          console.log(currentClassName)
              return '<span class="' + currentClassName + '">${TAB_LIST[index]}</span><span class="' + currentClassName + '">排行榜</span>';
          }*/
          paginationBulletRender(swiper, index, className) {
            return `<span class="${className} tab-name">${TAB_LIST[index]}</span>`
          },
          onInit:function(swiper){
            swiper.animate=true;
          },
          onTouchMove:function(swiper){
            swiper.animate=false;
          },
          onTransitionEnd:function(swiper){
            swiper.animate=true;
          }
       } 
    }
  },
  computed:{
    isAnimate(){
      /*console.log(this.$refs.mySwiper)
      if(this.$refs.mySwiper.swiper){
          
      }*/
     return this.$refs;
    }
  },
  methods:{
    move(){
      /*console.log(this.swiper.animate)*/
    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/home.css';
</style>
