<template>
	<div class="ui inverted huge vertical menu">
		<a v-for="item in menu" v-bind:class="[currentItem === item.name ? 'active' : '', 'item', 'teal']">
			<i v-if="item.icon" v-bind:class="['icon', item.icon]"></i>
			{{item.name}}
		</a>
	</div>
</template>

<script>
	export default {
		name: 'sidebar',
		props: {
			menu: Array,
			currentItem: String,
		},
	};
</script>

<style scoped>
	.menu {
		height: 100%;
		border-radius: 0 !important;
	}

	.menu > a.item > i.icon {
		float: left !important;
		margin: 0 1em 0 0 !important;
	}

	.menu > a.item {
		border-radius: 0 !important;
	}
</style>