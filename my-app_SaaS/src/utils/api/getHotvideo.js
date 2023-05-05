import request from '../request'

export function getHotvideo(){
    return request({
        url:'api/hotvideo',
    })
}