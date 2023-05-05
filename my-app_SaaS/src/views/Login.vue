<template>
  <div>
    <el-form class="login-container" :model="form">
        <h3 class="login_title">请先登陆</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item> 
        <el-form-item label="密   码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <span style="color: brown;">{{ info }}</span>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getLogin } from '@/utils/api/getLogin'
import { ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

let info = ref('')
const onSubmit = () => {
  getLogin({username:form.username,password:form.password}).then(res=>{
      if(res){
          localStorage.setItem('token',res)
          localStorage.setItem('user',form.username)
          router.push({name:'home'})
          info.value = ''
      }else{
         info.value = '账号密码错误'
      }
  }),
  error=>{
    console.log('请求失败!', error.message)
  }
}
</script>

<style scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    text-align: center;
   
}
.login_title{
      margin-bottom: 10px;
      color: #505458;
    }
</style>