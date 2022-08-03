<template>
	<div>
		<dl class="item">
			<!-- dt就相当于头部 dd相当于内容 -->
			<dt class="top">
				<div class="left">
					<img :src="headerData.coverImgUrl" :alt="headerData.name" />
				</div>
				<div class="right">
					<h4>{{ headerData.name }}</h4>
					<div class="btn">
						<a href="#" class="a_l"></a>
						<a href="#" class="a_r"></a>
					</div>
				</div>
			</dt>
			<dd>
				<ol>
					<li v-for="(item, idx) in AllPlaylistTrack" :key="idx">
						<span>{{ idx + 1 }}</span>
						<a href="#">{{ item.name }}</a>
					</li>
					<li class="all">
						<a href="#">查看全部> </a>
					</li>
				</ol>
			</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: "WorkspaceHomeListItem",

	props: {
		headerData: {
			required: true,
		},
		AllPlaylistTrack: {
			required: true,
		},
	},

	data() {
		return {}
	},
}
</script>

<style lang="scss" scoped>
.item {
	width: 227px;
	border: 1px solid #d3d3d3;
	border-top: 0;
	border-left: 0;
	border-bottom: 0;
	.top {
		display: flex;
		padding: 20px;
		height: 120px;
		.left {
			margin-right: 10px;
			img {
				width: 80px;
				height: 80px;
				cursor: pointer;
			}
		}
		.right {
			margin-top: 5px;
			.btn {
				position: relative;
				margin-top: 8px;
				a {
					width: 30px;
					height: 30px;
					background: url("~@/assets/index.png") no-repeat;
				}
				a.a_l {
					position: absolute;
					top: 0;
					left: -3px;
					background-position: -263px -200px;
				}
				a.a_l:hover {
					background-position: -263px -230px;
				}
				a.a_r {
					position: absolute;
					top: 1px;
					left: 30px;
					background-position: -295px -202px;
				}
				a.a_r:hover {
					background-position: -295px -232px;
				}
			}
		}
	}
	li {
		// display: flex 如果父元素有高度会继承,宽度由内部自己决定
		display: flex;
		padding-left: 25px;
		width: 100%;
		height: 32px;
		background-color: #f4f4f4;
		line-height: 32px;
		list-style: none;
		a {
			margin-left: 15px;
			color: black;
			font-size: 12px;
			text-decoration: none;
		}
	}
	li:nth-child(odd) {
		background-color: #e8e8e8;
	}
	.all {
		display: block;
		a {
			float: right;
			margin-right: 30px;
			color: black;
			text-decoration: none;
		}
		font-size: 12px;
	}
}
</style>
