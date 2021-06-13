import { createApp } from 'vue'
import App from './App.vue'
import './styles/app.css'; // Here
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app')
