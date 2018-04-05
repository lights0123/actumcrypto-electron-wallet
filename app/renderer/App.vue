<template>
	<div class="app ui grid">
		<sidebar
				:menu="menuItems"
				:current-item="selectedItem"
				v-on:item-selected="setSelectedItem"
				class="two column grid-sidebar">
		</sidebar>
		<div :is="selectedItem" class="two wide column"></div>
	</div>
</template>

<script>
	import Sidebar from './components/sidebar.vue';
	import Home from './components/home.vue';

	export default {
		components: {
			Sidebar,
			Home,
		},
		data() {
			return {
				selectedItem: 'Home',
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
		margin-top: 0 !important;
	}

	.grid-sidebar {
		padding-right: 0 !important;
		margin: 0 !important;
	}
</style>