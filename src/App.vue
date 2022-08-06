<template>
	<div id="app">
		<div class="header">
			<div class="top">
				<div class="top-content">
					<div class="logo">
						<h1>
							<a href="/#" hideFocus="true">网易云音乐</a>
						</h1>
					</div>
					<div class="middle">
						<ul>
							<li
								v-for="(item, index) in list1"
								:key="index"
								:class="{ active: item.flag }"
								@click="musicBtn(index)"
							>
								<span>{{ item.name }}</span>
							</li>
						</ul>
					</div>
					<div class="right">
						<div class="search" @click="inputBtn">
							<input type="text" ref="input" />
							<label v-if="ifLabelShow">音乐/视频/电台/用户</label>
						</div>
						<div class="creator">创作者中心</div>
						<div class="login">
							<a href="#" @click="loginBtn">登录</a>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="wrap">
					<ul>
						<li
							v-for="(obj, index) in list2"
							:key="index"
							@click="functionBtn(index)"
						>
							<span :class="{ active: obj.flag }">{{ obj.name }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="dialog" v-if="isShowDialog">
			<div class="login">
				<div class="title">
					<h4>登录</h4>
					<i @click="closeBtn"></i>
				</div>
				<div class="content">
					<button id="pLogin" @click="pLoginBtn">手机号登录</button>
					<button id="register">注册</button>
				</div>
			</div>
		</div>
		<router-view />
		<div class="playVideo" ref="playVideo">
			<div class="icon">
				<a href="javascript:;" hidefocus="true"></a>
			</div>
			<div class="audio">
				<button class="play" @click="playAudio">
					<a href="javascript:;" ref="audioBtn"></a>
				</button>
				<audio ref="audio" src="@/assets/y1060.mp3"></audio>
				<div class="progress">
					<div
						class="left"
						:style="{ left: `${progress}px` }"
						ref="leftBtn"
						@mousedown="mousedown"
					>
						<span></span>
					</div>
					<div class="right" ref="w_progress">
						<span ref="r_s"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
	name: "WorkspaceApp",

	data() {
		return {
			list1: [
				{
					name: "发现音乐",
					flag: true,
				},
				{
					name: "我的音乐",
					flag: false,
				},
				{
					name: "关注",
					flag: false,
				},
				{
					name: "商城",
					flag: false,
				},
				{
					name: "音乐人",
					flag: false,
				},
				{
					name: "下载客户端",
					flag: false,
				},
			],
			list2: [
				{
					name: "推荐",
					flag: true,
				},
				{
					name: "排行榜",
					flag: false,
				},
				{
					name: "歌单",
					flag: false,
				},
				{
					name: "主播电台",
					flag: false,
				},
				{
					name: "歌手",
					flag: false,
				},
				{
					name: "新碟上架",
					flag: false,
				},
			],
			ifLabelShow: true,
			// 控制登录弹窗隐显
			isShowDialog: false,
			// 控制播放暂停
			isShowPlay: true,
			// 进度条进度
			progress: 0,
		}
	},

	created() {
		this.$store.dispatch("getTopPlayListSong")
		this.$store.dispatch("getNewAlbum")
		this.$store.dispatch("getAllToplist")
		// 可视窗口的高
		const elemtHeight = document.documentElement.clientHeight

		document.onmousemove = (event) => {
			event = event || window.event
			if (
				event.clientY >= elemtHeight - 60 &&
				event.clientY <= elemtHeight - 5
			) {
				this.$refs.playVideo.style.transition = "transform 0.5s ease"
				this.$refs.playVideo.classList.add("active")
			} else {
				this.$refs.playVideo.style.transition = "transform 0.5s ease 2s"
				this.$refs.playVideo.classList.remove("active")
			}
		}
		// console.log(`浏览器body的可视窗口为${document.body.clientWidth}`)
		// console.log(`浏览器可视窗口高为${document.body.clientHeight}`)
		// console.log(`浏览器可视窗口搞为${document.documentElement.clientHeight}`)
	},

	methods: {
		musicBtn(i) {
			this.list1.forEach((item) => {
				item.flag = false
			})
			this.list1[i].flag = !this.list1[i].flag
		},
		functionBtn(i) {
			this.list2.forEach((item) => {
				item.flag = false
			})
			this.list2[i].flag = !this.list2[i].flag
		},
		inputBtn() {
			this.ifLabelShow = false
			this.$refs.input.focus()
		},
		loginBtn() {
			this.isShowDialog = true
		},
		closeBtn() {
			this.isShowDialog = false
		},
		// 手机号登录
		pLoginBtn() {
			this.$store.dispatch("login")
		},
		// 音乐播放按钮
		playAudio() {
			this.isShowPlay = !this.isShowPlay
			const audioBtn = this.$refs.audioBtn
			if (this.isShowPlay) {
				this.$refs.audio.play()
				audioBtn.classList.add("pause")
			} else {
				this.$refs.audio.pause()
				audioBtn.classList.remove("pause")
			}
		},
		// 点击鼠标拖动进度条
		mousedown(e) {
			// 当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，此时会导致拖拽功能的异常，这个是浏览器提供的一个默认行为，
			// 取消浏览器默认行为
			e.preventDefault()

			// 鼠标事件注册在容器上，只要鼠标离开这个容器
			// 鼠标松开事件就不触发了，所以应该在window上注册
			// 鼠标松开事件 window.onmouseup = () => {}

			// 鼠标移动事件应该绑定在window或者document上面
			const w_progress = this.$refs.w_progress.offsetWidth

			window.onmousemove = (event) => {
				event = event || window.event
				let x = event.clientX - this.$refs.leftBtn.offsetParent.offsetLeft + 10
				if (x >= -10 && x <= w_progress) {
					this.$refs.r_s.style.width = `${x + 10}px`
					this.progress = x
				}
			}
			// 当按键松开时，清除鼠标移动事件
			window.onmouseup = () => {
				window.onmousemove = null
			}
		},
	},
	computed: {
		...mapGetters([
			"hitSongList",
			"newAlbumList",
			"allToplist",
			"AllPlaylistTrack",
		]),
	},
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#app {
	position: relative;
}
.header {
	.top {
		height: 70px;
		background-color: #242424;
		.top-content {
			display: flex;
			margin: 0 auto;
			width: 1100px;
			height: 100%;
			.logo {
				width: 160px;
				height: 100%;
				background: url("~@/assets/topbar.png") no-repeat;
				background-position: 0 0;
				h1 {
					opacity: 0;
				}
			}
			.middle {
				margin-left: 13px;
				height: 100%;
				ul {
					li {
						position: relative;
						float: left;
						padding: 0px 20px;
						height: 100%;
						color: #a1a1a1;
						text-align: center;
						line-height: 70px;
						list-style: none;
						cursor: pointer;
					}
					.active {
						color: white;
						background-color: rgba(0, 0, 0, 0.5);
					}
					li:hover {
						color: white;
						background-color: rgba(0, 0, 0, 0.5);
					}
					:nth-child(6)::after {
						position: absolute;
						top: 17px;
						right: -23px;
						content: "";
						width: 40px;
						height: 25px;
						background: url("~@/assets/topbar.png") no-repeat;
						background-position: -182px 0;
					}
				}
			}
			.right {
				display: flex;
				align-items: center;
				margin-left: 60px;
				height: 100%;

				.search {
					position: relative;
					input {
						padding-left: 30px;
						width: 158px;
						height: 32px;
						border: none;
						border-radius: 32px;
						outline: none;
					}
					label {
						position: absolute;
						top: 8px;
						left: 29px;
						color: #9b9b9b;
						font-size: 12px;
						cursor: text;
					}
				}
				.search::before {
					content: "";
					position: absolute;
					top: 1px;
					left: -1px;
					width: 30px;
					height: 30px;
					background: url("~@/assets/topbar.png") no-repeat;
					background-position: -1px -101px;
					cursor: pointer;
				}
				.creator {
					margin-left: 15px;
					width: 90px;
					height: 32px;
					color: #a1a1a1;
					font-size: 12px;
					border: 1px solid #4f4f4f;
					border-radius: 25px;
					text-align: center;
					line-height: 32px;
					cursor: pointer;
				}
				.creator:hover {
					border-color: white;
				}
				.login {
					margin-left: 20px;
					cursor: pointer;
					a {
						color: rgb(168, 158, 158);
						text-decoration: none;
						font-size: 12px;
					}
					a:hover {
						color: rgb(231, 219, 219);
					}
				}
			}
		}
	}
	.bottom {
		height: 35px;
		background-color: #c20c0c;
		.wrap {
			height: 100%;
			margin-left: 384px;
			ul {
				display: flex;
				height: 104%;
				li {
					position: relative;
					padding: 8px 36px;
					height: 100%;
					color: white;
					font-size: 12px;
					text-align: center;
					list-style: none;
					cursor: pointer;
					span {
						display: block;
						height: 20px;
						padding: 0 10px;
						line-height: 20px;
					}
					span:hover {
						background-color: rgba(110, 4, 4, 0.9);
						border-radius: 15px;
					}
				}
				li:nth-child(1) {
					padding-right: 26px;
				}
				li:nth-child(1)::after {
					content: "";
					position: absolute;
					top: -12px;
					left: 50px;
					display: block;
					width: 0;
					height: 0;
					border: 6px solid red;
					border-color: transparent transparent red transparent;
				}
				li:nth-child(3)::after {
					content: "";
					position: absolute;
					top: 8px;
					left: 73px;
					display: block;
					width: 30px;
					height: 30px;
					background: url("~@/assets/white-r-icon@3x.png") no-repeat;
				}
				.active {
					background-color: rgba(110, 4, 4, 0.9);
					border-radius: 15px;
				}
			}
		}
	}
}
.dialog {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.65);
	z-index: 1000;
	.login {
		width: 528px;
		height: 326px;
		background-color: #fff;
		border-radius: 5px;
		.title {
			display: flex;
			justify-content: space-between;
			padding: 7px 0 0 10px;
			height: 39px;
			background-color: #2d2d2d;
			h4 {
				color: white;
			}
			i {
				display: block;
				margin-top: 5px;
				width: 20px;
				height: 20px;
				background: url("~@/assets/close.png") no-repeat;
				background-position: 0 100%;
				cursor: pointer;
			}
		}
		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: calc(100% - 39px);
			button {
				width: 219px;
				height: 31px;
				font-size: 12px;
				border: 0;
				border-radius: 3px;
				cursor: pointer;
			}
			button#pLogin {
				color: white;
				background-color: #2576c4;
			}
			button#pLogin:hover {
				background-color: #0e5291;
			}
			button#register {
				margin-top: 20px;
				color: black;
				background-color: #fff;
				border: 1px solid #cdcdcd;
			}
			button#register:hover {
				background-color: rgb(170, 155, 155);
			}
		}
	}
}
.playVideo {
	position: fixed;
	right: 0;
	bottom: 0;
	transform: translateY(54px);
	transition: transform 0.5s ease;
	.icon {
		position: absolute;
		top: -14px;
		right: 0;
		width: 52px;
		height: 22px;
		background: url("~@/assets/playbar.png") no-repeat;
		background-position: 1px 64%;
		a {
			position: absolute;
			top: 6px;
			left: 18px;
			display: block;
			width: 17px;
			height: 19px;
			background: url("~@/assets/playbar.png") no-repeat;
			background-position: -80px 64%;
		}
		a:hover {
			background-position: -80px -402px;
		}
	}
	.audio {
		position: relative;
		width: 100vw;
		height: 54px;
		background: url("~@/assets/playbar.png") 0px 0px;
		.play {
			a {
				position: absolute;
				top: 12px;
				left: 306px;
				width: 36px;
				height: 37px;
				background: url("~@/assets/playbar.png") no-repeat -1px -204px;
			}
			a:hover {
				background: url("~@/assets/playbar.png") no-repeat -41px -204px;
			}
			a.pause {
				background-position: -1px -165px;
			}
			a.pause:hover {
				background-position: -41px -165px;
			}
		}
		.progress {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 400px;
			height: 116%;
			.left {
				position: absolute;
				top: 21px;
				left: 0px;
				width: 20px;
				height: 20px;
				z-index: 100;
				span {
					display: block;
					width: 20px;
					height: 20px;
					background: url("~@/assets/iconall.png") no-repeat -1px -252px;
				}
				span:hover {
					background-position: -1px -282px;
				}
			}
			.right {
				width: 466px;
				height: 9px;
				span {
					position: absolute;
					top: 27px;
					left: 0;
					width: 0;
					height: 100%;
					background: url("~@/assets/statbar.png") no-repeat 0px -66px;
					transition: width linear;
				}
			}
			.right::after {
				content: "";
				display: block;
				width: 100%;
				height: 100%;
				background: url("~@/assets/statbar.png") no-repeat 0 0;
			}
		}
	}
}
.playVideo.active {
	transform: translateY(0px);
	visibility: visible;
}
</style>
