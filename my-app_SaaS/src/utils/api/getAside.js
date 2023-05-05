import request from '../request'

export function getAside(){
    return request({
        url:'api/aside'
    })
}