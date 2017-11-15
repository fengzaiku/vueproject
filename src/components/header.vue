<template>
  <div class="header">
      <section class="albumReturn" v-if="$route.params.id">
          <button @touchend.prevent="returnPre">{{$route.name | filterName}}</button>
      </section>
      <section class="search" v-if="!$route.params.id">
          <div class="searchInput">
            <img src="../assets/image/icon-search.png" alt="">
            <form @submit.prevent="search(key)">
              <input type="text" 
              placeholder="搜索歌曲/专辑/歌手" 
              @focus="focus" 
              v-model="key"
              id="searchInput">
            </form>
          </div>
          <button  @touchend="cancel"  :class="{'cancelButShow':cancelBut}">
              取消
          </button>
      </section>
      <section class="HotBox" v-if="albumShow && cancelBut && searchRes==null">
        <ul class="searchHistory" >
            <li @touchend="search(item)" v-for="item in searchHistory">{{item}}</li>
        </ul>
        <ol class="hotList" v-for="(item,index) in hotkey">
          <li @touchend="search(item.k)">
            <span>{{index+1}}</span>
            <span>{{item.k}}</span>
            <span>{{(item.n/10000).toFixed(2) + "万"}}</span>
          </li>
        </ol>
      </section>  

      <search-res 
      v-if="searchRes!=null && cancelBut && albumShow" 
      :searchResult="searchRes" 
      @albumList="albumListHide">
      </search-res>  
  </div>
</template>

<script type="text/ecmascript-6">

const titleName={'album':"专辑","song":"歌手","rank":"排行榜"};
import searchRes from './searchResult'
export default {
  components:{
    searchRes
  },
  data(){
    return {
      cancelBut:false,
      returnButShow:true,
      albumShow:true,
      key:'',
      hotkey:[],
      searchHistory:[],
      searchRes:null
    }
  },
  methods:{
    focus:function(){
      this.cancelBut=true
      this.$emit('searchShow');
    },
    albumListHide:function(){
      this.albumShow=false;
      this.$emit('searchHide');
    },
    returnPre:function(){
      this.$router.go(-1);
      if(!this.albumShow){
        this.albumShow=true;
        this.$emit('searchShow');
      }
    },
    cancel:function(){
      this.cancelBut=false;
      this.$emit('searchShow');
      this.key="";
      this.$emit('searchHide');
      this.searchRes=null;
      setTimeout(function(){
        document.querySelector('#searchInput').blur();
      },100);
    },
    search:function(key){
      this.key=key;
      var that=this;
      this.$store.dispatch("search",key).then((response)=>{
        that.searchRes=response.data.data
        var index=that.searchHistory.indexOf(key);
        if(index!=-1){
          that.searchHistory.splice(index,1);
        }

        this.searchHistory.unshift(key);
        this.searchHistory=this.searchHistory.slice(0,10);
        localStorage.searchHistory=JSON.stringify(this.searchHistory);
      });
    }
  },
  filters:{
    filterName(name){
      return titleName[name];
    }
  },
  created:function(){
    if(localStorage.searchHistory){
      this.searchHistory=JSON.parse(localStorage.searchHistory);
    }

    this.$store.dispatch("getHotkey").then((response)=>{
       this.hotkey = response.data.data.hotkey.slice(0, 5)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
@import url('../assets/styleSheet/header.css');
</style>





