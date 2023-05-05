<template>
    <div class="nav-swiper">
        <!-- {{ a }}
        <img :src="codeUrl"  alt="">
        {{ a }} -->
        <div class="nav-swiper-main">
            <div class="swiper-t">
                <!-- aside -->
                <ul>
                    <li v-for="item in aside" :key="item.title" 
                        @click="selectAside(item.title)"
                    >
                        <span>{{ item.title }}</span>
                        <el-icon>
                            <ArrowRight/>
                        </el-icon>
                    </li>
                </ul>
                <!-- 轮播图 -->
                <div>
                    <el-carousel :interval="3000" arrow="always">
                        <el-carousel-item v-for="item in aside" :key="item.title" style="margin-top: 60px;margin-left: 200px;">
                            <h3 text="2xl" justify="center">{{ item.title }}</h3>
                            <img src="@/assets/vue.svg">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onBeforeMount, reactive } from 'vue'
    //按需引入 Elementui
    import { ArrowRight } from '@element-plus/icons-vue'
    //引入api接口
    import { getSlider } from '@/utils/api/getSlider'
    import { getAside } from '@/utils/api/getAside'

    
    import { video } from '@/store/video'     //模块化
    import { storeToRefs } from 'pinia'

    import { useRouter } from 'vue-router'
    
    let aside = ref([])        //aside数据
    // let codeUrl =ref('')         //轮播图数据

    
    onBeforeMount(()=>{
        whichTitle.value = 'home'
        getAside().then(res => {
            console.log('aside数据请求成功',res)
            aside.value = res
        })
        // getSlider().then(res => {
        //   console.log(res)
        //   let blob = new Blob([res], {type: "image/png"});   // 返回的文件流数据
        //   console.log(blob)
        //   let url = window.URL.createObjectURL(blob);  // 将他转化为路径
        //   codeUrl.value = url  // 将转换出来的路径赋值给变量，其实和上一步结合就可以
        //     console.log(url);
        // })

    })

    //video
    const videoStore = video()
    let {whichVideo,whichTitle} = storeToRefs(videoStore)  //解构出的数据是响应式的，可以直接修改

    
    const router = useRouter()

    const selectAside = (title) =>{
        whichVideo.value = title
        whichTitle.value = 'video'
        router.push({ name: 'video'})

    }
</script>

<style scoped>
.nav-swiper{
    width: 100%;
    height: 450px;
    background:linear-gradient(#488160, rgb(243,243,243)) ;
}
.nav-swiper-main{
    width: 1100px;
    padding: 47px 0;
    margin: 0 auto;
}
.swiper-t{
    display: flex;
    height: 373px;
    border-radius: 11px 11px 0px 0px;
}
.swiper-t ul{
    width: 160px;
    flex-direction: column;
    height: 100%;
    background: #2b2b3d;
    border-radius: 11px 0px 0px 0px;
}
.swiper-t ul li{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    height: 37px;
    margin-top: 30px;
    font-size: 16px;
    color: white;
    cursor: pointer;        /*小手 */
}
.active{
    background : linear-gradient(to right, #488160, #2b2b3d);
}
.swiper-t > div{
    width: 840px;
    height: 373px;
}
/* .el-carousel{
    height: 373px;
} */
:deep(.el-carousel){
    height: 373px;
}

</style>