<template>
  <section class="musicAction">
    <dl class="actionList">
      <dd>
        <h4>{{item.name}}</h4>
        <p>{{item.singer.length ? item.singer[0].name : item.singer}}</p>
      </dd>
      <dd @touchend="playNext">下一首播放</dd>
      <!-- <dd>添加到播放列表</dd> -->
      <dt @touchend="cancel">取消</dt>
    </dl>
  </section>
</template>

<script type="text/ecmascript-6">
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState({
        item:state=>state.PlayService.song
    })
  },
  methods:{
    cancel(){
      this.$emit("musicActionhide");
    },
    playNext(){
      this.$store.commit("playContinue")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
@import '../assets/styleSheet/musicAction.css';
</style>
