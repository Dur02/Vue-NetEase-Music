import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')

router.afterEach(()=>{
    document.documentElement.scrollTop = 0;
})
