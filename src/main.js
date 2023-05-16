
import { createApp } from 'vue'
import App from './app/App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(VueAxios, axios)
    .mount('#app')
