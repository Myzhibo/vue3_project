import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'

//配置导航守卫
//全局前置
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = localStorage.getItem('token')
  if( to.name=='vip' && !token ){      //点击vip时候未登录，跳转至登录页
      next({name:'login'})
  } else{
      next()
  }
})

createApp(App).use(router).use(createPinia()).mount('#app')
