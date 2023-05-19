import { createApp } from 'vue'
import App from './app/App'
import router from './router'

// 引入vuex
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from '@/config/axios'
// import VueAxios from 'vue-axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(router).use(ElementPlus).use(store).mount('#app')
