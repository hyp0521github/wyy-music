<template>
	<div>
		我是playlist
		{{ $route.query.id }}
		{{ id }}
	</div>
</template>

<script>
export default {
	name: "WorkspacePlaylist",

	data() {
		return {}
	},

	mounted() {},

	computed: {
		id() {
			return this.$route.query.id
		},
	},

	methods: {},
}
</script>

<style lang="scss" scoped></style>
