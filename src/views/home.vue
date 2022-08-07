<template>
	<div class="home-page">
		<div
			class="page-top"
			ref="pageTop"
			@mouseover="mouseoverBtn"
			@mouseout="mouseoutBtn"
		>
			<div class="home-page-content">
				<div class="rotationChart" ref="rotationChart">
					<div class="img" v-for="(item, index) in imgData" :key="index">
						<img :src="item.url" />
					</div>
					<div class="img1">
						<img src="@/assets/photo/1.jpg" ref="img" />
					</div>
				</div>
			</div>
			<div class="download">
				<img src="@/assets/download.png" alt="download" />
			</div>
			<div class="btn left" @click="leftBtn"></div>
			<div class="btn right" @click="rightBtn"></div>
			<div class="circle">
				<ul>
					<li
						v-for="(item, idx) in imgData"
						:key="idx"
						:class="{ active: item.flag }"
						@click="circleBtn(idx)"
					></li>
				</ul>
			</div>
		</div>
		<div class="page-middle">
			<div class="middle-left">
				<div class="hot">
					<Header></Header>
					<div class="hot-content">
						<div
							class="item"
							v-for="(item, idx) in hitSongList"
							:key="idx"
							@click="playListBtn"
						>
							<img :src="item.coverImgUrl" :alt="item.name" />
							<p>{{ item.name }}</p>
							<div class="bottom">
								<div class="left">
									<i></i>
									<span>{{
										item.playCount > 10000
											? `${Math.floor(item.playCount / 10000)}万`
											: item.playCount
									}}</span>
								</div>
								<div class="right">
									<i></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="new-disc">
					<Header title="新碟上架" :isShowNav="false"></Header>
					<div class="content">
						<a
							class="left"
							@click="discLeftBtn"
							:style="{ pointerEvents: pointerEvents }"
						></a>
						<div class="middle" ref="middleDisc">
							<div
								:class="{
									items: true,
								}"
								ref="itemsDisc"
							>
								<div
									class="item"
									v-for="(item, index) in newAlbumList"
									:key="index"
								>
									<em v-if="discId === item.id"></em>
									<img :src="item.blurPicUrl" alt="1" />
									<i @mouseover="bfOverBtn(item.id)" @mouseout="bfOutBtn"></i>
									<p class="songName">{{ item.name }}</p>
									<p class="artistName">{{ item.artist.name }}</p>
								</div>
							</div>
						</div>
						<a
							class="right"
							@click="discRightBtn"
							:style="{ pointerEvents: pointerEvents }"
						></a>
					</div>
				</div>
				<div class="list">
					<Header title="榜单" :isShowNav="false"></Header>
					<div class="content">
						<!-- 使用短路运算符运算：当allToplist[0]还没有数据时，虚拟DOM就已经加载了，
						所以报错，但是页面还是加载了，因为当created调用时就给allTopslist赋值了，
						使用短路运算符运算在他还没加载之前使用一个空的数组，这样子就不报错 -->
						<HomeListItem
							:headerData="allToplist[0] || defaultHeadData"
							:AllPlaylistTrack="
								AllPlaylistTrack.slice(0, 10) || defaultAllPlaylistTrack
							"
						></HomeListItem>
						<HomeListItem
							:headerData="allToplist[1] || defaultHeadData"
							:AllPlaylistTrack="
								AllPlaylistTrack.slice(10, 20) || defaultAllPlaylistTrack
							"
						></HomeListItem>
						<HomeListItem
							:headerData="allToplist[2] || defaultHeadData"
							:AllPlaylistTrack="
								AllPlaylistTrack.slice(20, 30) || defaultAllPlaylistTrack
							"
						></HomeListItem>
					</div>
				</div>
			</div>
			<div class="middle-right">
				<div class="userlogin">
					<p style="font-size: 12px">
						登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
					</p>
					<button>用户登录</button>
				</div>
				<div class="singer">
					<div class="header">
						<div class="left">入驻歌手</div>
						<div class="right">查看全部></div>
					</div>
					<div class="content">
						<div class="item" v-for="(obj, idx) in singerData" :key="idx">
							<div class="left">
								<img src="~@/assets/singer.jpg" alt="歌手" />
							</div>
							<div class="right">
								<h4 style="font-size: 14px">张惠妹aMEl</h4>
								<p style="font-size: 12px; color: #666">台湾歌手张惠妹</p>
							</div>
						</div>
					</div>
					<div class="btn">
						<button>
							<i>申请成为网易音乐人</i>
						</button>
					</div>
				</div>
				<div class="anchor">
					<div class="header">
						<div class="left">热门主播</div>
					</div>
					<div class="content">
						<div class="item" v-for="(obj, idx) in singerData" :key="idx">
							<div class="left">
								<img src="~@/assets/r.jpg" alt="主播" />
							</div>
							<div class="right">
								<h4 style="font-size: 12px">陈立</h4>
								<p style="font-size: 12px; color: #666">
									心理学家 美食家陈立教授
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fixed" ref="fixed">
			<a href="#"></a>
		</div>
	</div>
</template>

<script>
import Header from "@/components/header.vue"
import { mapGetters } from "vuex"
import HomeListItem from "@/components/home-list-item.vue"
import { throttle } from "lodash"

export default {
	name: "WorkspaceHome",

	data() {
		return {
			imgData: [
				{
					url: require("@/assets/photo/1.jpg"),
					flag: true,
					bgColor: "#ea9ab3",
				},
				{
					url: require("@/assets/photo/2.jpg"),
					flag: false,
					bgColor: "#671a22",
				},
				{
					url: require("@/assets/photo/3.jpg"),
					flag: false,
					bgColor: "#171717",
				},
				{
					url: require("@/assets/photo/4.jpg"),
					flag: false,
					bgColor: "#5addff",
				},
				{
					url: require("@/assets/photo/5.jpg"),
					flag: false,
					bgColor: "#adceef",
				},
				{
					url: require("@/assets/photo/6.jpg"),
					flag: false,
					bgColor: "#220a14",
				},
				{
					url: require("@/assets/photo/7.jpg"),
					flag: false,
					bgColor: "#fbccde",
				},
				{
					url: require("@/assets/photo/8.jpg"),
					flag: false,
					bgColor: "#5d78ab",
				},
			],
			singerData: [1, 2, 3, 4, 5],
			num: 0,
			timer: null,
			timer2: null,
			isLeftBtn: true,
			isShowBf: false,
			discId: 0,
			// 控制disc的滚动
			discNum: 2,
			defaultAllPlaylistTrack: [
				{
					name: "",
				},
			],
			defaultHeadData: [
				{
					coverImgUrl: "",
					name: "",
				},
			],
			arr: [1, 2, 3],
			obj: {
				name: "hyp",
				age: 18,
			},
			// 禁止鼠标点击事件
			pointerEvents: "",
		}
	},

	created() {
		this.timerBtn()
		//当文档滚动时事件自动发生
		window.onscroll = () => {
			if (document.documentElement.scrollTop > 1) {
				this.$refs.fixed.style.display = "block"
			} else {
				this.$refs.fixed.style.display = "none"
			}
		}
	},

	methods: {
		circleBtn(index) {
			this.num = index
			if (index === this.imgData.length) {
				index = 0
			} else if (index === this.imgData.length + 1) {
				index = 1
			} else if (index < 0) {
				index = this.imgData.length - 1
			}
			this.imgData.forEach((item) => {
				item.flag = false
			})
			this.imgData[index].flag = true
			const rotationChart = this.$refs.rotationChart
			const imgWidth = this.$refs.img.offsetWidth
			let imgLeft = index * imgWidth
			rotationChart.style.transform = `translateX(-${imgLeft}px)`
			this.pageTopBgc(index)
		},
		leftBtn() {
			this.isLeftBtn = true
			this.debounce(800)
		},
		left() {
			this.num--
			this.circleBtn(this.num)
			if (this.num < 0) {
				this.moveTo(this.imgData.length, this.imgData.length - 1)
			}
			const imgWidth = this.$refs.img.offsetWidth
			const rotationChart = this.$refs.rotationChart
			rotationChart.style.transition = "1s ease"
			rotationChart.style.transform = `translateX(-${this.num * imgWidth}px)`
			// 清除定时器
			this.timer2 = null
		},
		rightBtn() {
			this.isLeftBtn = false
			this.debounce(800)
		},
		right() {
			this.num++
			this.circleBtn(this.num)

			if (this.num > this.imgData.length) {
				this.moveTo(0, 1)
			}
			const imgWidth = this.$refs.img.offsetWidth
			const rotationChart = this.$refs.rotationChart
			rotationChart.style.transition = "1s ease"
			rotationChart.style.transform = `translateX(-${this.num * imgWidth}px)`
			// 清除定时器
			this.timer2 = null
		},
		// 节流伐
		debounce(delay) {
			if (this.timer2) {
				return
			}
			if (this.isLeftBtn) {
				this.timer2 = setTimeout(() => {
					this.left()
				}, delay)
			} else {
				this.timer2 = setTimeout(() => {
					this.right()
				}, delay)
			}
		},
		moveTo(end, start) {
			const imgWidth = this.$refs.img.offsetWidth
			const rotationChart = this.$refs.rotationChart
			this.num = end
			// 清除过渡效果
			rotationChart.style.transition = "none"
			rotationChart.style.transform = `translateX(-${this.num * imgWidth}px)`
			// 强制渲染：只要你去读取浏览器的尺寸就会导致浏览器的回流
			// 这一回流就会导致重新渲染
			rotationChart.clientHeight
			this.num = start
		},
		pageTopBgc(index) {
			const pageTop = this.$refs.pageTop
			pageTop.style.backgroundColor = `${this.imgData[index].bgColor}`
		},
		timerBtn() {
			this.timer = setInterval(() => {
				this.right()
			}, 3000)
		},
		clearTimer() {
			clearInterval(this.timer)
			this.timer = null
		},
		mouseoverBtn() {
			this.clearTimer()
		},
		mouseoutBtn() {
			this.timerBtn()
		},
		bfOverBtn(id) {
			this.discId = id
		},
		bfOutBtn() {
			this.discId = 0
		},
		// 控制disc左右滑动
		discMove() {
			const itemsDisc = this.$refs.itemsDisc
			const middleDiscWidth = this.$refs.middleDisc.offsetWidth + 8
			let scrollLeft = middleDiscWidth * this.discNum
			itemsDisc.style.transition = "all 1s linear"
			itemsDisc.style.transform = `translateX(-${scrollLeft}px)`
		},
		// disc左按钮
		discLeftBtn: throttle(function () {
			// this.disabledBtn()
			this.leftBtn()
		}, 1000),
		leftBtn() {
			const itemsDisc = this.$refs.itemsDisc
			const middleDiscWidth = this.$refs.middleDisc.offsetWidth + 8
			this.discNum--
			if (this.discNum < 0) {
				this.discNum = 2
				itemsDisc.style.transition = "none"
				itemsDisc.style.transform = `translateX(-${
					this.discNum * middleDiscWidth
				}px)`
				this.discNum = 1
			}
			this.discMove()
		},
		// disc右按钮
		discRightBtn() {
			this.disabledBtn()
			const itemsDisc = this.$refs.itemsDisc
			const middleDiscWidth = this.$refs.middleDisc.offsetWidth + 8
			this.discNum++
			if (this.discNum > 2) {
				this.discNum = 0
				itemsDisc.style.transition = "none"
				itemsDisc.style.transform = `translateX(-${
					this.discNum * middleDiscWidth
				}px)`
				this.discNum = 1
			}
			this.discMove()
		},
		// 禁用点击按钮
		disabledBtn() {
			this.pointerEvents = "none"
			// setTimeout如果写普通函数是调用不到this的，
			// 普通函数里面的this指向的是window
			setTimeout(() => {
				this.pointerEvents = ""
			}, 1000)
		},
		playListBtn() {
			this.$router.push({
				path: "/playlist",
				query: {
					id: 5659832889,
				},
			})
		},
	},

	computed: {
		...mapGetters([
			"hitSongList",
			"newAlbumList",
			"allToplist",
			"AllPlaylistTrack",
		]),
		count() {
			return this.imgData.map((item) => {
				return { ...item, flag: item.flag === true ? 1 : 2 }
			})
		},
	},

	components: {
		Header,
		HomeListItem,
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	.page-top {
		display: flex;
		justify-content: center;
		position: relative;
		max-height: 253px;
		width: 100%;
		height: 253px;
		background-color: #b67f8e;
		.download {
			width: 254px;
			height: 100%;
			background-color: red;
			overflow: hidden;
		}
		.home-page-content {
			width: 722px;
			height: 100%;
			overflow: hidden;
			.rotationChart {
				display: flex;
				width: 6500px;
				height: 100%;
				transition: 1s ease;
				.img,
				.img1 {
					width: 722px;
					height: 100%;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.btn {
			position: absolute;
			top: 99px;
			width: 37px;
			height: 70px;
			background: url("~@/assets/banner.png") no-repeat;
		}
		.btn.left {
			left: 209px;
			background-position: 0 -358px;
		}
		.btn.right {
			right: 210px;
			background-position: 0 -500px;
		}
		.btn.left:hover {
			background-position: 0 -428px;
		}
		.btn.right:hover {
			background-position: 0 -570px;
		}
		.circle {
			position: absolute;
			top: 89%;
			left: 36%;
			ul {
				display: flex;
				li {
					margin-right: 10px;
					width: 15px;
					height: 15px;
					background-color: #fff;
					border-radius: 50%;
					list-style: none;
				}
				.active {
					background-color: red;
				}
			}
		}
	}
	.page-middle {
		display: flex;
		margin: 0 auto;
		width: 976px;
		height: 1527px;
		border: 1px solid #d3d3d3;
		.middle-left {
			padding: 20px 20px 0 20px;
			width: 722px;
			.hot {
				width: 100%;
				.hot-content {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-top: 10px;
					.item {
						position: relative;
						margin-right: 20px;
						margin-top: 10px;
						width: 140px;
						height: 204px;
						cursor: pointer;
						img {
							width: 140px;
							height: 140px;
						}
						p {
							font-size: 14px;
						}
						.bottom {
							display: flex;
							justify-content: space-between;
							position: absolute;
							top: 113px;
							left: 0;
							width: 100%;
							height: 27px;
							background-color: rgba(0, 0, 0, 0.5);
							.left {
								display: flex;
								align-items: center;
								i {
									margin: 0 8px 0 10px;
									display: inline-block;
									width: 14px;
									height: 11px;
									background: url("~@/assets/iconall.png") no-repeat;
									background-position: 0 -24px;
								}
								span {
									font-size: 12px;
									color: white;
								}
							}
							.right {
								padding: 5px 10px 0 0;
								i {
									display: inline-block;
									width: 16px;
									height: 18px;
									background: url("~@/assets/iconall.png") no-repeat;
									background-position: 0 1px;
									cursor: pointer;
								}
								i:hover {
									background-position: 0 -59px;
								}
							}
						}
					}
					.item:nth-child(4),
					.item:nth-child(8) {
						margin-right: 0;
					}
				}
			}
			.new-disc {
				width: 100%;
				height: 186px;
				margin-top: 120px;
				.content {
					position: relative;
					padding: 26px 27px 0 27px;
					width: 100%;
					height: 100%;
					background-color: #f5f5f5;
					border: 1px solid rgb(221, 211, 211);
					.middle {
						width: 100%;
						height: 100%;
						overflow: hidden;
					}
					.items {
						width: 2000px;
						height: 141px;
						transform: translateX(-1268px);
						transition: all 0.5s linear;
					}
					.item {
						width: 100px;
						height: 141px;
						margin-right: 27px;
						position: relative;
						float: left;
						cursor: pointer;
						img {
							width: 100px;
							height: 100px;
							box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.4);
						}
						em {
							position: absolute;
							right: 0;
							bottom: 42px;
							width: 22px;
							height: 22px;
							background: url("~@/assets/index.png") no-repeat;
							background-position: -267px 60%;
						}
						i::after {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							width: 122px;
							height: 100px;
							background: url("~@/assets/coverall.png");
							background-position: 0px 925px;
						}
						.songName {
							margin-bottom: 5px;
							width: 100px;
							font-size: 12px;
						}
						.songName:hover,
						.artistName:hover {
							text-decoration: underline;
						}
						.songName,
						.artistName {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.artistName {
							color: #666;
							font-size: 12px;
						}
					}
					a {
						position: absolute;
						top: 68px;
						width: 17px;
						height: 17px;
						background: url("~@/assets/index.png") no-repeat;
						background-position: -260px -75px;
						cursor: pointer;
					}
					.left {
						left: 7px;
						z-index: 100;
					}
					.left:hover {
						background-position: -280px -75px;
					}
					.right {
						right: 9px;
						background-position: -300px -75px;
						z-index: 100;
					}
					.right:hover {
						background-position: -320px -75px;
					}
				}
			}
			.list {
				margin-top: 120px;
				width: 100%;
				height: 474px;
				.content {
					display: flex;
					margin-top: 20px;
					width: 100%;
					height: 100%;
					border: 1px solid #d3d3d3;
				}
			}
		}
		.middle-right {
			border-left: 1px solid #e1e1e1;
			width: calc(100% - 722px);
			.userlogin {
				padding: 20px;
				height: 130px;
				color: #666;
				background-color: #e8e8e8;
				line-height: 25px;
				text-align: center;
				border-bottom: 1px solid #c9c9c9;
				button {
					margin-top: 15px;
					width: 100px;
					height: 31px;
					font-size: 12px;
					color: white;
					background-color: #d51218;
					border: 0;
					border-radius: 3px;
				}
			}
			.singer {
				padding: 20px;
				.header {
					display: flex;
					justify-content: space-between;
					padding-bottom: 10px;
					border-bottom: 1px solid #dbd6d6;
					.left,
					.right {
						font-size: 12px;
					}
					.left {
						font-weight: 700;
					}
					.right {
						color: #666;
					}
				}
				.content {
					margin-top: 25px;
					.item {
						margin-top: 15px;
						display: flex;
						width: 100%;
						height: 62px;
						cursor: pointer;
						.right {
							padding-left: 10px;
							padding-top: 7px;
							width: calc(100% - 62px);
							border: 1px solid #dbd6d6;
							border-left: 0;
							background-color: #fafafa;
							h4 {
								margin-bottom: 10px;
							}
						}
					}
				}
				.btn {
					margin-top: 15px;
					height: 31px;
					button {
						width: 100%;
						height: 100%;
						font-size: 12px;
						font-weight: 700;
						border: 0;
						background: url("~@/assets/button2.png") no-repeat;
						background-position: 0 -58px;
						border-right: 2px solid #c3c3c3;
						border-radius: 3px;
						i {
							font-style: normal;
						}
					}
				}
			}
			.anchor {
				padding: 20px;
				.header {
					padding-bottom: 10px;
					border-bottom: 1px solid #dbd6d6;
					.left {
						font-size: 12px;
						font-weight: 700;
					}
				}
				.content {
					margin-top: 25px;
					.item {
						margin-top: 15px;
						display: flex;
						width: 100%;
						height: 40px;
						cursor: pointer;
						.right {
							display: flex;
							flex-direction: column;
							justify-content: center;
							padding: 0 0 0 10px;
							width: calc(100% - 40px);
							line-height: 19px;
						}
					}
				}
			}
		}
	}
	.fixed {
		display: none;
		a {
			position: fixed;
			top: 311px;
			right: 216px;
			width: 49px;
			height: 44px;
			background: url("~@/assets/sprite.png") no-repeat;
			background-position: -265px -46px;
		}
		a:hover {
			background-position: -325px -46px;
		}
	}
	.nav {
		li:nth-child(3n) {
			color: red;
		}
	}
}
</style>
