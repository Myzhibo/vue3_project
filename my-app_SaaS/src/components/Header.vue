<template>
    <header>
        <!-- {{ whichTitle }}
        {{ whichVideo}} -->
        <div class="header-main">
            <!-- 左 -->
            <div class="header-l">
                <h1 class="logo"><img src="../assets/vue.svg" alt=""></h1>
                <ul>
                    <li  @click="changeVideo('home')">
                    <span :class="whichTitle == 'home' ? 'active' : 'normal'">首 页</span>         <!--  动态添加样式 -->
                    </li>
                    <li  @click="changeVideo('video')">
                    <span :class="whichTitle == 'video' ? 'active' : 'normal'">视 频</span>
                    </li>
                    <li  @click="changeVideo('vip')">
                    <span :class="whichTitle == 'vip' ? 'active' : 'normal'">会 员</span>
                    </li>
                    <!-- <li class="active">首 页</li>
                    <li>视 频</li>
                    <li>会 员</li> -->
                </ul>
            </div>
            <!-- 右 -->
            <div class="header-r">
                <div class="search">
                    <input type="text" name="" id="" placeholder="视频">
                    <el-icon :size="20" color="#999">
                        <Search/>
                    </el-icon>
                </div>
                <!-- <div class="shop">
                    <el-icon :size="20" color="black">
                        <ShoppingCart/>
                    </el-icon>
                </div> -->
                <div class="login">
                    <div v-if="isLogin===0">
                        <router-link to="/login">登录</router-link>
                    </div>
                    <div v-if="isLogin===1" style="display: flex;">
                        <div style="color: #000; margin-right: 15px;">你好，{{ username }}!</div>
                        <div @click="logout">退出登录</div>
                    </div>
                </div>
            </div>
        </div>  
    </header>
</template>

<script setup>
    import { onBeforeMount } from 'vue'
    //按需引入 Elementui
    import { Search, ShoppingCart } from '@element-plus/icons-vue'
    
    import { video } from '@/store/video'     //模块化
    import { storeToRefs } from 'pinia'

    import { useRouter } from 'vue-router'
    const router = useRouter()

    //video
    const videoStore = video()
    let {whichTitle} = storeToRefs(videoStore)  //解构出的数据是响应式的，可以直接修改


    const changeVideo = (title) =>{
        whichTitle.value = title
        router.push({ name: title})
    }

    let isLogin = ref(0)
    if(localStorage.getItem('token')) {isLogin.value = 1}

    const logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        if(localStorage.getItem('token')) {isLogin.value = 1}
        
        isLogin.value = 0
    }

    let username = ref('')
    username.value = localStorage.getItem('user')
</script>

<style scoped>
header{
    width: 100%;
    height: 80px;
}
.header-main{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1100px;
    height: 80px;
    margin: 0 auto;
    /* background: red; */
}
.header-l{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
    width: 127px;
    height: 50px;
    margin-right: 51px
}
.logo img{
    width: 100%;
    height: 100%; 
}
.header-l ul{
    display: flex;
    height: 50px;
}
.header-l ul li {
    margin-right: 79px;
    font-size: 16px;
    /* color: #808080; */
    line-height: 50px;
    font-weight: 500;
    cursor: pointer;        /*小手 */
}
.active{
    position: relative;
    color: #41B883;
}
.active:after{
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 140%;
    height: 3px;
    margin-left: -20%;
    background: #41B883;
}
.normal{
    position: relative;
    color: #333333;
}
.header-r{
    display: flex;
    align-items: center;
}
.header-r .search{
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 300px;
    height: 43px;
    background: #dbdedf;
    opacity: 1;
    border-radius: 5px;
}
.header-r .search input{
    width: 270px;
    height: 43px;
    background: #dbdedf;
    border: none;           /*边框none */
    outline: none;          /*焦点边框none */
}
.header-r .shop{
    margin-left: 42px;
    cursor: pointer;        /*小手 */
}
.header-r .login{
    margin-left: 39px;
    font-size: 16px;
    color: #808080;
    cursor: pointer;        /*小手 */
}

.header-r .login a{
    margin-left: 39px;
    font-size: 16px;
    color: #808080;
    cursor: pointer;        /*小手 */
}
</style>