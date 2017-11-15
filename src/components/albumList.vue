<template>
  <section class="albumBox">
    <swiper :options="swiperOption" ref="mySwiper" class="albumSwiperBox">
        <swiper-slide class="swiper-wrapper">
            <img :src="dataImgUrl" alt="" class="albumBg">
            <div class="albumListPage">
                <figure class="albumFigure">
                  <img :src="dataImgUrl" alt="">
                  <figcaption>
                    <h3>{{album.name}}<span>-{{album.singername}}</span></h3>
                    <p>{{album.cur_song_num}}首歌曲</p>
                    <p>{{album.genre}}  {{album.lan}}</p>
                    <p>发行时间:{{album.aDate}}</p>
                    <p>唱片公司:{{album.company}}</p>
                  </figcaption>
                </figure>
                <ul class="albumPageList">
                  <li v-for="(item,index) in album.list">
                      <div  @touchend="playSongIndex(index)">
                        <h3>{{item.songname}}</h3>
                        <p>{{item.albumdesc}}</p>
                      </div>
                      <img src="../assets/image/icon-...black.png" alt="">
                  </li>
                </ul>
            </div>
        </swiper-slide>
    </swiper>
  </section>
</template>

<script type="text/ecmascript-6">
import {swiper,swiperSlide} from "vue-awesome-swiper"
export default {
  components:{
    swiper,
    swiperSlide
  },
  data(){
    return {
      album:[],
      albumList:[],
      translate:0,
      mid:this.$route.params.id,
      swiperOption:{
          notNextTick: true,
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true
        }
    }
  },
  methods:{
    playSongIndex(index){
      var that=this;
      if(this.translate==this.swiper.translate){
          this.$store.commit("playSong",{index:index,list:that.albumList});
        }else{
          this.translate=this.swiper.translate;
        }
    }
  },
  computed:{
    dataImgUrl(){
      return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+this.mid+'.jpg?max_age=2592000'
    },
    swiper(){
      return this.$refs.mySwiper.swiper;
    }
  },
  created:function(){
    this.$store.dispatch("getAlbumList",this.mid).then((response)=>{
      this.album=response.data.data;

      this.album.list.forEach(item=>{
        this.albumList.push({
          id:item.songid,
          name:item.songname,
          albumid:item.albummid
        });
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/albumList.css';
</style>
