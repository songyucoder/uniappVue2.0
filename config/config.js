
const baseUrl = {
    // 开发环境接口
    base: 'https://k.test.com/api',

    // 生产环境接口
    pro: 'http://www.deai66.com',

    // 测试环境接口
    test: 'http://www.deai66.com',
	
	// 图片资源路径
	image_url: '/static/images'
};


module.exports = {
    HTTP_URL: baseUrl.base,
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
    },
    TOKEN_NAME: 'token',
    EXPIRE: 0,
}
