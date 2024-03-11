import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},
        hasLogin: false
    },
    mutations: {
        login(state, provider) {
            state.hasLogin = true
            // state.userInfo.uid = provider.id
            // state.uerInfo.username = provider.username
            // state.uerInfo.avatar = provider.avatar
            state.userInfo = provider
            // 这里面再次进行了存储
            uni.setStorage({
                key: 'userInfo',
                data: provider
            })
        },
		changeUserInfo(state,mapObj){
			const mapIter = Object.keys(mapObj);
			for (let obj of mapIter) {
				// 如果说相互之间存在key的话，进行重新赋值
				state.userInfo[obj] = mapObj[obj]
			}
			uni.setStorage({
			    key: 'userInfo',
			    data: state.userInfo
			})
		},
        logout(state, is_Nav_login) {
            // is_Nav_login 是否需要跳转到登录页
            state.hasLogin = false
            state.userInfo = {}
            uni.removeTabBarBadge({ //隐藏数字标-购物车
                index: 2 //tabbar下标
            })
            uni.removeStorage({
                key: 'userInfo'
            })
            uni.removeStorage({
                key: 'token'
            })
            if (is_Nav_login) {
                uni.navigateTo({
                    url: '/pages/login/login'
                })
            }
        }
    },
    getters: {
        hasLogin: (state, getters) => {
            return state.hasLogin
        },
        userInfo: (state, getters) => {
            return state.userInfo
        },
        getUerId: (state, getters) => {
            return state.userInfo.id
        }
    },
	
})

export default store
