import request from '../request'

export function getCar(){
    return request({
        url:'api/cars'
    })
}