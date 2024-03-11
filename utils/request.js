import { HTTP_URL, HEADER, TOKEN_NAME } from '@/config/config'
import store from '@/store'

const request = (config) => {
    config.url = HTTP_URL + config.url
    config.header = HEADER
    let dataObj = null
    let promise = new Promise(function (resolve, reject) {
        uni.showLoading()
        uni.request(config)
            .then((responses) => {
                uni.hideLoading()
                uni.stopPullDownRefresh()
                // 异常
                if (responses.statusCode == 200) {
                    // 当http目前数据异常返回的格式，暂定
                    let response = responses.data
                    if (response.code == 0) {
                        // 数据请求成功
                        resolve(response)
                    } else if (response.code == 401) {
                        uni.showToast({
                            title: '请重新登录',
                            icon: 'none'
                        })
                        store.commit('logout', true)
                        reject()
                    } else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'error'
                        })
                        // resolve(response)
						store.commit('logout',true)
						reject()
                    }
                    reject()
                } else if (responses.statusCode == 401) {
                    uni.showToast({
                        title: '请重新登录',
                        icon: 'none'
                    })
                    console.log('dddf')
                    store.commit('logout', true)
                    reject()
                } else if (responses.statusCode == 422) {
                    uni.showToast({
                        title: responses.data.status_code + responses.data.message,
                        icon: 'none'
                    })
                    store.commit('logout', true)
                    reject()
                } else if (responses.statusCode == 505) {
                    uni.showToast({
                        title: responses.data.message,
                        icon: 'none'
                    })
                    store.commit('logout', true)
                    reject()
                } else {
                    uni.showToast({
                        title: responses.data.message,
                        icon: 'none'
                    })
					store.commit('logout',true)
                    reject()
                }
            })
            .catch((error) => {
                uni.hideLoading()
                uni.stopPullDownRefresh()
                console.log('dddf123445')
                uni.showToast({
                    title: '请求接口失败',
                    icon: 'error'
                })
                console.log(error)
                reject(error)
            })
    })
    return promise
}

export default request
