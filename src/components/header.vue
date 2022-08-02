<template>
	<div class="header">
		<div class="left">
			<div class="icon"></div>
			<h2>{{ title }}</h2>
			<div class="nav" v-if="isShowNav">
				<ul>
					<li>
						<span>华语</span>
					</li>
					<li>
						<span>流行</span>
					</li>
					<li>
						<span>摇滚</span>
					</li>
					<li>
						<span>民谣</span>
					</li>
					<li>
						<span>电子</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="right">
			<span>更多</span>
			<i></i>
		</div>
	</div>
</template>

<script>
export default {
	name: "WorkspaceHeader",

	data() {
		return {}
	},

	props: {
		title: {
			type: String,
			default: "热门推荐",
		},
		isShowNav: {
			type: Boolean,
			default: true,
		},
	},

	mounted() {},

	methods: {},
}
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	width: 682px;
	height: 35px;
	border-bottom: 2px solid red;
	.left {
		display: flex;
		.icon {
			width: 32px;
			height: 32px;
			background: url("~@/assets/index.png") no-repeat;
			background-position: -225px -155px;
		}
		h2 {
			margin-left: 10px;
			font-size: 20px;
			line-height: 31px;
			font-weight: normal;
		}
		.nav {
			ul {
				display: flex;
				li {
					position: relative;
					padding: 8px 20px;
					font-size: 12px;
					color: #666;
					list-style: none;
					cursor: pointer;
					span::after {
						content: "";
						position: absolute;
						top: 14px;
						left: 61px;
						height: 12px;
						width: 1px;
						background-color: red;
					}
				}
				li:nth-child(5) {
					span::after {
						content: "";
						display: none;
					}
				}
			}
		}
	}
	.right {
		padding-top: 3px;
		cursor: pointer;
		span {
			font-size: 12px;
			color: #666;
		}
		i {
			display: inline-block;
			width: 20px;
			height: 20px;
			background: url("~@/assets/index.png") no-repeat;
			background-position: 4px -231px;
		}
	}
}
</style>
