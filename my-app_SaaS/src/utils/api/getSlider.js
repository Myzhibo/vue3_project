import request from '../request'

export function getSlider(){
    return request({
        url:'api/slider',
        // responseType: 'arraybuffer' // 最为关键
        
        responseType: 'blob'
    })
}