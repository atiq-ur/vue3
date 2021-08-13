import { createApp } from 'vue'
import App from './App.vue'
import './styles/app.css'; // Here
import router from './router';
import store from './store/index';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
