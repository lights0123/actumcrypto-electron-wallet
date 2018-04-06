import Vue from 'vue';
import VueRouter from 'vue-router';
import './css/main.scss';
import mainPanel from './components/mainPanel.vue';
import App from './App.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	routes: [
		{ path: '/', component: mainPanel },
	],
});
const app = new Vue({ router, render: h => h(App) });
app.$mount('app');

