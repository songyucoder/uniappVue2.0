import { HTTP_URL, HEADER, TOKEN_NAME } from '@/config/config'



// 上传资源
const upload = (config) => {
    config.url = HTTP_URL + config.url
    uni.showLoading();
	let promise = new Promise(function (resolve, reject) {
		uni.uploadFile({
			url: config.url,
			filePath: config.filePath,
			name: 'file', //必须填file
			success: (responses) => {
				uni.hideLoading();
				console.log(responses)
					if (responses[0]) { // 目前数据异常返回的格式，暂定
					    reject({
					        message: '网络超时',
					    })
					} else {
					    let response = JSON.parse(responses.data)
						if(response.code == 0){ // 数据请求成功
							resolve(response.data)
						}else {
							uni.showToast({
							    title: response.msg,
							    icon: 'error',
							})
						}
					}
			},
			fail: (error) => {
				uni.hideLoading();
				reject(error)
			}
		})
	})
	return promise      
}

export default upload
