<template>
	<div class="ui segment loader-container">
		<div class="ui active inverted dimmer">
			<div class="ui text loader">Loading</div>
		</div>
		<p></p>
	</div>
</template>

<script>
	export default {
		name: 'loading',
	};
</script>

<style scoped>
	.loader-container {
		height: 100%;
	}
</style>