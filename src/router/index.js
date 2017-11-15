import Vue from 'vue'
import Router from 'vue-router'
import Home  from '@/components/home'
import AlbumList from '@/components/albumList'
import SongMenu from '@/components/songMenu'
import RankList from '@/components/rankList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'home',component: Home},
    { path: '/album/:id',name: 'album',component: AlbumList},
    { path: '/song/:id',name: 'song',component: SongMenu},
    { path: '/rank/:id',name: 'rank',component: RankList}
  ]
})
