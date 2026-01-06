import "@/assets/scss/base.scss"
import "@/assets/icon/iconfont.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Dialog from '@/components/Dialog.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.component('Dialog', Dialog)

app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.bodyMaxWidth = window.widths;
app.config.globalProperties.bodyMinWidth = 320;
app.mount('#app')
