<template>
  <div id="swiper">
    <swiper  :options="swiperOption" class="swiperConten" ref="mySwiper">
      <swiper-slide class="swiper-wrapper">
        <!-- 单曲 -->
        <div class="songBox" v-if="searchResult.song">
          <h2 class="musicTitle">
            <img src="../assets/image/icon-music.png" alt="">
            <span>{{searchResult.song.name}}</span>
          </h2>
          <ul class="singleList">
            <li v-for="(item,index) in searchResult.song.itemlist">
                <b @touchend="play(index)">{{item.name}}</b>
                <span @touchend="play(index)">-{{item.singer}}</span>
                <!-- <img src="../assets/image/icon-...black.png" alt="" > -->
            </li>
          </ul>
        </div>
        <!-- 专辑 -->
        <div class="songBox" v-if="searchResult.album">
          <h2 class="musicTitle">
            <img src="../assets/image/icon-album.png" alt="">
            <span>{{searchResult.album.name}}</span>
          </h2>
          <div class="albumList">
              <figure v-for="item in searchResult.album.itemlist">
                <img :src="item.pic" alt=""  @touchend="albumList(item.mid)">
                <figcaption  @touchend="albumList(item.mid)">
                  <p>{{item.name}}</p>
                  <p>{{item.singer}}</p>
                </figcaption>
              </figure>
          </div>
        </div>
        <!-- 歌手 -->
        <!--<div class="songBox" v-if="searchResult.singer">
          <h2 class="musicTitle">
            <img src="../assets/image/icon-singer.png" alt="">
            <span>{{searchResult.singer.name}}</span>
          </h2>
          <div class="albumList songAuthor">
              <figure v-for="item in searchResult.singer.itemlist">
                <img :src="item.pic" alt="">
                <figcaption>
                  {{item.name}}
                </figcaption>
              </figure>
          </div>
        </div>-->
        <!-- MV -->
        <div class="songBox" v-if="searchResult.mv">
          <h2 class="musicTitle">
            <img src="../assets/image/icon-mv.png" alt="">
            <span>{{searchResult.mv.name}}</span>
          </h2>
          <ul class="mvList">
            <li v-for="item in searchResult.mv.itemlist">
                <h3 @touchend="openmv(item.vid)">{{item.name}}</h3>
                <p @touchend="openmv(item.vid)">{{item.singer}}</p>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>
 </div>
</template>
<script>
 import {swiper,swiperSlide} from "vue-awesome-swiper" 
  export default {
    props:["searchResult"],
    components:{
      swiper,
      swiperSlide
    },
    data(){
        return {
          translate:0,
          swiperOption: {
              notNextTick: true,
              direction: 'vertical',
              slidesPerView: 'auto',
              mousewheelControl: true,
              freeMode: true
            }
        }
    },
    computed:{
      swiper(){
        return this.$refs.mySwiper.swiper;
      }
    },
    methods:{
      albumList:function(id){
        if(this.translate==this.swiper.translate){
          this.$router.push({name:'album',params:{id:id}});
          this.$emit("albumList");
        }else{
          this.translate=this.swiper.translate;
        }
      },
      play: function (index) {
        if(this.translate==this.swiper.translate){
          this.$store.commit('playSong',{
            index: index,
            list: this.searchResult.song.itemlist
          })
        }else{
          this.translate=this.swiper.translate;
        }
      },
      openmv(vid){
        if(this.translate==this.swiper.translate){
           window.open("https://y.qq.com/portal/mv/v/" + vid + ".html")
        }else{
          this.translate=this.swiper.translate;
        }
      }
    }
  }
</script>
<style  scoped >
  @import '../assets/styleSheet/searchResult.css'
</style>
