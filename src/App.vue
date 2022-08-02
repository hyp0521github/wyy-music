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
			isShowDialog: false,
		}
	},

	created() {
		this.$store.dispatch("getTopPlayListSong")
		this.$store.dispatch("getNewAlbum")
		this.$store.dispatch("getAllToplist")
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
</style>
