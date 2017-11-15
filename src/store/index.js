import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


import SearchServe from "./searchServe.js"
import PlayService from "./playService.js"

console.log(PlayService)
export default new Vuex.Store({
	modules:{
		SearchServe,
		PlayService
	}
});













