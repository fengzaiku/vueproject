
import * as ApiConfig from "../config/apiConfig.js"

export default {
	state:{
		playing:false,
		index:0,
		list:[],
		lastRuntime:0,
		song:{
			name:ApiConfig.DEFAULT_SONGNAME,
			id:null
		}
	},
	mutations:{
		playSong(state,object){
			var nowTime=Date.now();
			if((nowTime-state.lastRuntime)<100 || nowTime==0){
				return ;
			}
			 state.list=object.list;
			 state.index=object.index;
			 state.song=state.list[object.index];
			state.playing=true;
			state.lastRuntime=nowTime;
		},
		play(state){
			state.playing=true;
		},
		pause(state){
			state.playing=false;
		},
		playContinue(state){
			state.index=parseFloat(state.index+1);
			state.song=state.list[state.index%state.list.length];
		}
	},
	getters:{
		coverImg(state){
			if(!state.song.albumid){
				return ApiConfig.DEFAULT_ALBUMIMG;
			}else{
				return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+state.song.albumid+".jpg"
			}
		}
	}
}









