# my-app(vue3 + vite +  pinia + axios二次封装、api解耦 + Element-plus)

## 1. 项目准备
### (1). 项目搭建
-   npm init vite my-app_SaaS
-   cd my-app_SaaS
-   npm install
-   npm run dev
-   *清空src/style.css
### (2). 安装router
-   npm install vue-router@4 -S
-   新建文件夹router/index.js配置路由
```js
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        component: ()=> import("../views/About.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
```
-   新建文件夹views存放路由文件
-   main.js文件挂载路由
```js
import router from './router'

createApp(App).use(router).mount('#app')
```
### (3). 安装unplugin-auto-import插件(不用手动import引入依赖)  和设置@代表src目录
-   npm i unplugin-auto-import -D
-   在vite.config.js中配置
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
// const path = require('path');  // vite的版本3.1不支持commonJS,使用import
import path from 'path'

export default defineConfig({
  plugins:[
    vue(),
    //配置插件
    AutoImport({
        imports: ['vue','vue-router']
    })
  ],
  resolve:{
      alias:{
          "@" : path.resolve(__dirname, './src')
      }
  }
})
```
### (4). 安装Element-plus
-   官网: https://element-plus.gitee.io/en-US/guide/quickstart.html
-   npm install element-plus --save
-   按需引入还需下载  npm install -D unplugin-vue-components unplugin-auto-import
-   更新vite.config.js
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
// const path = require('path');  // vite的版本3.1不支持commonJS,使用import
import path from 'path'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins:[
    vue(),
    //配置插件
    AutoImport({
        imports: ['vue','vue-router'],
        resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve:{
      //设置路径别名
      alias:{
          "@" : path.resolve(__dirname, './src')
      }
  }
})
```
### (5). 全局css reset
-   App.vue中style设置css初始化
```css
*{margin: 0; padding: 0;}
a{
  text-decoration: none;
}
ul{
  list-style: none;
}
```

## 2. 页面布局
### (1). 创建头部组件Header
-   按需引入 Elementui 
    import { Search } from '@element-plus/icons-vue'
### (2). 首页轮播图组件NavSwiper
-   按需引入 element走马灯
-   样式穿透
    -   Vue2.x版本使用优先级 /deep/ 大于 >>>
    -   Vue3版本使用 :deep()
-   渐变背景 linear-gradient(#488160, rgb(243,243,243))     //默认上到下
-   渐变背景 linear-gradient(to right, 488160, rgb(243,243,243))        //左向右
-   cursor: pointer;        /*小手 */
### (3). 创建头部组件Footer

## 3. 功能实现
### (1). 配置axios代理，axios二次封装，api解耦
-   下载axios:   npm install axios
-   vite.config.js中引入server代理服务
```js
server:{
    proxy:{
        '/api' : {            //   '/api'叫做请求前缀, 有前缀就走代理(可以改名)
          target: 'http://localhost:5002/',
          rewrite: path => path.replace(/^\/api/, ''),  //送到服务器时 去除前缀api
          ws: true,           //用于支持websocket
          changeOrigin: true  //用于控制请求头的host值
        }
    }
}
```
-   src下创建utils/request.js
### (2). home- 实现今日热门换一批功能
### (3)  创建video路由,video组件
### (4). 安装pinia， 实现home-aside点击带数据跳转到video路由
-   npm install pinia
-   引入: main.js中
    -   import { createPinia } from 'pinia'
    -   createApp(App).use(createPinia()).mount('#app')
-   新建文件夹store/index.js中写入
-   模块化
- 路由跳转
    -   import { useRouter } from 'vue-router'
    -   const router = useRouter()
    -   router.push({ name: 'video'})
### (5). 登陆页面+权限管理
-   (1). 登录
    -   点击登陆后通过Mock随机生成token存入localStorage中
    -   跳转至VIP需登录状态，此时添加路由守卫
-   (2). 退出登录
    -   右上角退出登录，删除cookie中的token，不用退到login界面
### (6). 会员页 + 导航守卫
-   main.js中设置全局前置导航守卫,当未登录时点击会员页，跳转到登录界面


