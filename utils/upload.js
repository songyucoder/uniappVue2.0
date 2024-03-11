import { HTTP_URL, HEADER, TOKEN_NAME } from '@/config/config'

// 上传资源
const upload = (config) => {
    config.url = HTTP_URL + config.url
    uni.showLoading();
	let promise = new Promise(function (resolve, reject) {
		console.log(config)
		uni.uploadFile({
			url: config.url,
			filePath: config.filePath,
			name: 'file', //必须填file
			header:{'Authorization': uni.getStorageSync('token')},
			formData: config.dic, // module =  forum=论坛，news=咨询，goods=商品，avatar=头像，poster=海报，cases=病例，other=其他 {'module':chat}
			success: (responses) => {
				uni.hideLoading();
				console.log(responses)
					if (responses.statusCode !== 200) { // 当http目前数据异常返回的格式，暂定
					     uni.showToast({
					         title: responses.data.status_code + responses.data.message,
					         icon: 'none',
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
