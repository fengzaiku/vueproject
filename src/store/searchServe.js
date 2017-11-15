

import Vue from "vue"
import Api from "../config/api"

function apiFactor(api){
	return function (id=null){
		return Vue.http.jsonp(
			api.url,
			{
				params: api.params(id),
				jsonp:api.jsonp
			}
		);
	}
}

export default{
	actions:{
		getRankSongs({}, id){
	      return apiFactor(Api.rank_songs)(id)
	    },
		getRecommands({}){
			return apiFactor(Api.first_page_data)();
		},
		getAlbumList({},id){
			return apiFactor(Api.album)(id);
		},
		getCdList({},id){
			console.log(id)
			return apiFactor(Api.cd)(id);
		},
	    getRankList({}){
	      return apiFactor(Api.rank_list)()
	    },
	    getRankList({}){
	      return apiFactor(Api.rank_list)()
	    },
	    search({},key){
	      return apiFactor(Api.search)(key)
	    },
	    getHotkey({}){
	      return apiFactor(Api.hotkey)()
	    }
	}
}











