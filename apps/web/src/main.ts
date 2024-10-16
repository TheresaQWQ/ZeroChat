import { createApp } from 'vue'
import './theme.css'
import './style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App)

app.use(router)

app.mount('#app')
