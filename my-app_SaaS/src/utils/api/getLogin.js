import request from '../request'

//post请求
export function getLogin(data){
    return request({
        url:'api/login',
        method:'post',
        data
    })
}