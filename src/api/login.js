import request from '@/utils/request.js'

export function login() {
    return request({
        methods: 'get',
        url: '/login/cellphone',
        params: {
            phone: '13605012726',
            password: '123654Ax'
        }
    })
}
// 游客登录
export function registerLogin() {
    return request({
        methods: 'get',
        url: '/register/anonimous',
    })
}

// 获取每日推荐歌曲
export function recommendSongs(cookie) {
    return request({
        methods: 'get',
        url: '/recommend/songs',
        params: {
            cookie
        }
    })
}

// 获取热门歌单分类
export function getPlayList() {
    return request({
        methods: 'get',
        url: '/playlist/hot',
    })
}

// 获取热门歌单
export function getTopPlayListSong(params) {
    return request({
        methods: 'get',
        url: '/top/playlist',
        params
    })
}
// 获取首页新碟上架
export function getNewAlbum(params) {
    return request({
        methods: 'get',
        url: '/album/new',
        params
    })
}

// 获取所有榜单接口地址
export function getAllToplist() {
    return request({
        methods: 'get',
        url: '/toplist',
    })
}

// 获取歌单详情
export function getPlaylistDetail(params) {
    return request({
        methods: 'get',
        url: '/playlist/detail',
        params
    })
}

// 获取歌单所有歌曲
export function getAllPlaylistTrack(params) {
    return request({
        methods: 'get',
        url: '/playlist/track/all',
        params
    })
}
