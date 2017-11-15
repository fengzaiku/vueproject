<template>
  <div id="play-bar">
    <audio :src="dataUrl" autoplay="autoplay" id="audio" @ended="playContinue"></audio>
    <section class="play-bar">
      <img :src="coverImg" alt="">
      <p>{{songname}}</p>
      <img :src="playing ? pauseImg : playImg" alt="" @touchend="playContorl">
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapMutations,mapActions,mapGetters} from "vuex"

export default {
	data(){
		return {
			playImg:require('../assets/image/icon-play.png'),
			pauseImg:require('../assets/image/icon-pause.png')
		}
	},
	computed:{
		...mapState({
			dataUrl(state){
				if(state.PlayService.song.id!=null){
					document.querySelector("#audio").load();
					return "http://ws.stream.qqmusic.qq.com/" + state.PlayService.song.id + ".m4a?fromtag=46"
				}
			},
			playing:state=>state.PlayService.playing,
			songname:state=>state.PlayService.song.name
		}),
		...mapGetters([
			"coverImg"
		])
	},
	watch:{
		playing(val){
			var audio=document.querySelector("#audio");
			if(val){
				if(audio.getAttribute('src')==null){/*这里是解决初次加载报错的bug*/
					audio.load();
				}else{
					audio.play();
				}
			}else{
				audio.pause();
			}
		}
	},
	methods:{
		playContorl(){
			this.playing ? this.pause() : this.play();
		},
		...mapMutations([
			"play","pause","playContinue"
		])
	}
}
</script>

<style  scoped >
@import url('../assets/styleSheet/play.css');
</style>
