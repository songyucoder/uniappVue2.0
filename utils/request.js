import { HTTP_URL, HEADER, TOKEN_NAME } from '@/config/config'

const request = (config) => {
    config.url = HTTP_URL + config.url
    config.header = HEADER
    let dataObj = null
    let promise = new Promise(function (resolve, reject) {
        uni.request(config)
            .then((responses) => {
				console.log(responses)
                // 异常
                if (responses[0]) { // 目前数据异常返回的格式，暂定
                    reject({
                        message: '网络超时',
                    })
                } else {
                    let response = responses.data
					if(response.code == 0){ // 数据请求成功
						 resolve(response)
					}else {
						uni.showToast({
						    title: response.msg,
						    icon: 'error',
						})
					}
                }
            })
            .catch((error) => {
                uni.showToast({
                    title: '请求接口失败',
                    icon: 'error',
                })
				console.log(error)
                reject(error)
            })
    })
    return promise
}


export default request

