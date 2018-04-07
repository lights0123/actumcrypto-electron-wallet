import Vue from 'vue';
import VueRouter from 'vue-router';
import 'semantic-ui-css';
import './css/main.scss';
import { init as initConfig } from './configManager';
import mainPanel from './components/mainPanel.vue';
import loading from './components/loading.vue';
import blockchainConfigure from './components/blockchainConfigure.vue';
import App from './App.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	routes: [
		{ path: '/', component: loading },
		{ path: '/main', component: mainPanel },
		{ path: '/config', component: blockchainConfigure },
	],
});
const app = new Vue({ router, render: h => h(App) });
window.app = app;
app.$mount('app');

if (initConfig()) {
	router.push('/main');
} else {
	router.push('/config');
}
