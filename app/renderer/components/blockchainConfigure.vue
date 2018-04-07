<template>
	<div class="ui middle aligned center aligned grid">
		<div class="column">
			<div class="ui text container">
				<h1 class="ui huge header">Select A Blockchain</h1>
				<br/>
				<br/>
				<div v-if="error" class="ui pointing below red basic label">
					Please select a blockchain
				</div>
				<br v-if="error"/>
				<select class="ui dropdown" v-model="selectedBlockchain">
					<option value="">Blockchain</option>
					<option v-for="blockchain in blockchainsAvailable" :value="blockchain">{{ blockchain }}</option>
				</select>
				<button class="ui primary button" @click="select">
					Select
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { getAvailableBlockchains, setParameter, saveConfig } from '../configManager.js';

	window.$ = $;
	export default {
		name: 'blockchainConfigure',
		data() {
			return {
				selectedBlockchain: '',
				blockchainsAvailable: [],
				error: false,
			};
		},
		created() {
			this.blockchainsAvailable = getAvailableBlockchains();
		},
		mounted() {
			console.log('created');
			this.semanticify();
		},
		methods: {
			semanticify() {
				$('.ui.dropdown').dropdown();
			},
			select() {
				if (this.selectedBlockchain) {
					setParameter('blockchain', this.selectedBlockchain);
					this.$router.push('/main');
				} else {
					this.error = true;
				}
			},
		},
	};
</script>

<style scoped>
	.ui.grid {
		height: 100%;
	}

	.header.huge {
		font-size: 36px;
	}

	.ui.button.primary {
		margin-left: 30px;
	}
</style>