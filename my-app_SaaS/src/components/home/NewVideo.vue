<template>
    <div class="new-video">
        <div class="new-video-main">
            <div class="new-video-t">
                <div class="txt" >今日热门</div>
                <div class="change" @click="changeVideo">
                    <el-icon><Refresh /></el-icon>换一批
                </div>
            </div>
            <div>
                <el-row >
                    <el-col class="new-video-b">
                        <el-card :body-style="{ padding: '0px' }"
                        v-for="item in newvideo" :key="item.title" >
                            <img
                            src="@/assets/vue.svg"
                            class="image"
                            />
                            <div style="padding: 14px">
                                <span class="myname">{{ item.title }}</span>
                                <span class="desc">{{ item.desc }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup>
 import { onBeforeMount, reactive } from 'vue';
 import { getHotvideo } from '@/utils/api/getHotvideo'
    //按需引入 Elementui
    import  { Refresh } from '@element-plus/icons-vue'

 let allVideo = reactive([])
 let newvideo = reactive([])

 onBeforeMount(()=>{
    getHotvideo().then(res=>{
        console.log('Hotvideo数据请求成功',res)
        allVideo = res
        let randomNum = Math.floor(Math.random()*5) //随机0 1 2 3 4 5
        for (let element of allVideo.slice(randomNum, randomNum+3)) {
            // console.log(element);
            newvideo.push(element)
        }
    })
 })

function changeVideo(){
    newvideo.pop()              //必须要加这行，暂不清楚原因
    console.log(newvideo)
    newvideo = reactive([])
    console.log(newvideo)
    let randomNum = Math.floor(Math.random()*5) //随机0 1 2 3 4 5
        console.log(randomNum)
        for (let element of allVideo.slice(randomNum, randomNum+3)) {
            // console.log(element);
            newvideo.push(element)
        }
    console.log(newvideo)
 }


</script>

<style scoped>
.new-video{
    margin-bottom: 20px;
}
.new-video-main{
    width: 1100px;
    margin: 0 auto;
    /* background-color: red; */
}
.new-video-t{
    display: flex;
    justify-content: space-between;
}
.txt{
    cursor: pointer;        /*小手 */
    margin-bottom: 15px;
}
.change{
    cursor: pointer;        /*小手 */
    color: #808080;
}
.new-video-b{
    display: flex;
    /* justify-content: space-around; */
    margin-right: 200px;

}
.el-card.is-always-shadow {
    margin-right: 40px;
    width: 300px;
    display: flex;
    align-content: center;
    cursor: pointer;        /*小手 */
}

.image {
  width: 100%;
  height: 100px;
  /* display: block; */
}

.desc{
    margin-top: 15px;
    display:block; 
    word-wrap : break-word ;      /*换行 */
    font-size: 14px;
    color: #808080;
}
.myname{
    font-size: 18px;
    color: #333333;
}
</style>