<template>
  <Header></Header>
  <div class="video-filter">
      <div class="filter-main">
        <div class="filter-item">
          <div class="item-title">分类:</div>
          <ul>
            <li v-for="item in aside" :key="item.title" @click="changeVideo(item.title)">
              <span :class="whichVideo == item.title ? 'active' : 'normal'">{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>
  </div>
  <div class="content">
    {{ whichVideo || '全部'}} 
  </div>
</template>

<script setup>
  import Header from '@/components/Header.vue'
  import { onBeforeMount } from 'vue'
  import { getAside } from '@/utils/api/getAside'

  import { video } from '@/store/video'     //模块化
  import { storeToRefs } from 'pinia'

  let aside = ref([])

  onBeforeMount(()=>{
    getAside().then(res => {
            console.log('video-aside数据请求成功',res)
            aside.value = res
        })
  })


  const videoStore = video()
  let {whichVideo} = storeToRefs(videoStore)  //解构出的数据是响应式的，可以直接修改

  const changeVideo = (title) =>{
    // alert(title)
    whichVideo.value = title
  }
</script>

<style scoped>
.filter-filter{
  width: 100%;
  height: 197px;
  background-color: #333333;
}
.filter-main{
  width: 1100px;
  margin: 0 auto;
}
.filter-item{
  display: flex;
  margin-top: 20px;
  margin-left: 90px;
}
.filter-item ul{
  display: flex;
}
.item-title{
  margin-right: 30px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.filter-item ul li{
  margin-right: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #515749;
  cursor: pointer;        /*小手 */
}

.active{
    position: relative;
    color: #41B883;
    font-weight: 600;
}
.normal{
    position: relative;
    color: #333333;
}

.content{
  display: flex;
  justify-content: space-around;
  height: 300px;  
  align-items: center;
}
</style>