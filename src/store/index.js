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
        const newAlbums = albums.slice(0, 5)
        albums.push(...newAlbums)
        context.commit('setNewAlbum', albums)
      })
    },
    // 获取所有榜单接口地址
    async getAllToplist(context) {
      // console.error("这是一个错误信息")
      // console.info("这是一个info信息")
      // console.warn("这是一个warn信息")
      // console.debug("这是一个错误信息")
      // // %c表示用style来代替
      // console.log('%c You just Won! a lottry', 'color: #bada55; background: #222');
      
      // 打印JSON对象
      // console.dir({"name": "hyp", "age": 18})
      // 打印函数调用次数
      // for (let i = 0; i < 5; i++) {
      //   console.count()
      // }
      // 追踪函数调用轨迹
      // function b() {
      //   a()
      // }
      // b()
      // function a() {
      //   console.trace()
      // }
      // 测试调用getAllToplist用的时间
      // console.time("this");
      const res = await getAllToplist()
      // console.timeEnd("this");
      const { list } = res
      const newList = list.splice(0, 3)
      context.commit('setAllToplist', newList)
      // 根据榜单id请求歌曲数据
      for (let i = 0; i <= context.state.allToplist.length - 1; i++) {
			  const { songs } = await getAllPlaylistTrack({ id: context.state.allToplist[i].id, limit: 10 })
        context.commit('setAllPlaylistTrack', songs)
		  }  
    },
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
