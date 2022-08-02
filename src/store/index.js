import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import { registerLogin, getTopPlayListSong, getNewAlbum, getAllToplist, getAllPlaylistTrack} from "@/api/login.js"
export default new Vuex.Store({
  state: {
    cookie: JSON.parse(window.localStorage.getItem('loginCookie')).cookie || "",
    hitSongList: [],
    newAlbumList: [],
    allToplist: [],
    AllPlaylistTrack: [],
  },
  mutations: {
    // 存储cookie
    setCookie(state, playload) {
      console.log('存储cookie成功');
      state.cookie = playload
    },
    // 存储热门歌单
    setHitSongList(state, playload) {
      state.hitSongList = playload
    },
    // 存储新碟上架列表
    setNewAlbum(state, playload) {
      state.newAlbumList = playload
    },
    // 存储所有榜单榜名信息
    setAllToplist(state, playload) {
      state.allToplist = playload
    },
    // 存储榜单对应的歌曲
    setAllPlaylistTrack(state, playload) {
      state.AllPlaylistTrack.push(...playload)
    }
  },
  actions: {
    // 登录并获取cookie
    login(context) {
      const key = "loginCookie"
			registerLogin().then((res) => {
				window.localStorage.setItem(key, JSON.stringify(res))
			})
			const data = JSON.parse(window.localStorage.getItem(key))
      const cookie = encodeURIComponent(data.cookie)
      context.commit('setCookie', cookie)
    },
    // 获取热门歌单分类
    async getTopPlayListSong(context) {
      const res = await getTopPlayListSong({ limit: 8 })
      const { playlists } = res
      context.commit('setHitSongList', playlists)
    },
    // 获取新碟上架
    async getNewAlbum(context) {
      getNewAlbum({ area: 'ZH', limit: 10}).then(res => {
        const { albums } = res
        context.commit('setNewAlbum', albums)
      })
    },
    // 获取所有榜单接口地址
    async getAllToplist(context) {
      const res = await getAllToplist()
      const { list } = res
      const newList = list.splice(0, 3)
      context.commit('setAllToplist', newList)
    },
    // 获取歌单所有歌曲
    async getAllPlaylistTrack(context, playload) {
      const { songs } = await getAllPlaylistTrack({ id: playload, limit: 10 })
      context.commit('setAllPlaylistTrack', songs)
    }
  },
  getters: {
    cookie: state => state.cookie,
    hitSongList: state => state.hitSongList,
    newAlbumList: state => state.newAlbumList,
    allToplist: state => state.allToplist,
    AllPlaylistTrack: state => state.AllPlaylistTrack,

  },
  modules: {},
});
