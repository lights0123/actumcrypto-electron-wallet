<template>
	<div class="app">
		<sidebar
				:menu="menuItems"
				:current-item="currentMenuItem"
				v-on:item-selected="setSelectedItem">
		</sidebar>
		<!--<bookmark-list
				:bookmarks="bookmarks | filterByCategory selectedCategory"
				:categories="categories">
		</bookmark-list>-->
	</div>
</template>

<script>
	import Sidebar from './components/sidebar.vue';

	export default {
		components: {
			Sidebar,
		},
		data() {
			return {
				currentMenuItem: 'Home',
				menuItems: [
					{ name: 'Home', icon: 'home' },
					{ name: 'Settings', icon: 'cog' },
				],
			};
		},
	};
</script>

<style scoped>
	.app {
		height: 100%;
	}
</style>