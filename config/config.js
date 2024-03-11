
const baseUrl = {
    // 开发环境接口
    base_http: process.uniEnv.BASE_API,

    // 生产环境接口
    pro: 'https://192.168.1.48',

    // 测试环境接口
    test: 'http://www.deai66.com',

	// 图片oss资源路径
	image_url: process.uniEnv.BASE_IMG_URL,
};


module.exports = {
	
    HTTP_URL: baseUrl.base_http,
    IMAGE_URL: baseUrl.image_url,
    HEADER: {
        'content-type': 'application/json',
        //#ifdef H5
        'Form-type':
            navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
                ? 'wechat'
                : 'h5',
        //#endif
        //#ifdef MP
        'Form-type': 'routine',
        //#endif
        //#ifdef APP-PLUS
        'Form-type': 'app',
        //#endif
		'Authorization': uni.getStorageSync('token')? uni.getStorageSync('token') : 'visitor',
    },
    TOKEN_NAME: 'token',
    EXPIRE: 0,
}

