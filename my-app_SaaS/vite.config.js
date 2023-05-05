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
          "@" : path.resolve(__dirname, './src')    //import时可以用@代替src
      }
  },
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
})
