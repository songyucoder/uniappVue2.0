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
            console.log('走了没有')
            state.hasLogin = true
            // state.userInfo.uid = provider.id
            // state.uerInfo.username = provider.username
            // state.uerInfo.avatar = provider.avatar
            state.userInfo = provider
            // 对个人信息中的头像链接进行一步兼容
            if (state.userInfo.avatar) {
                if(state.userInfo.avatar.indexOf('http') == -1) {
                    state.userInfo.avatar = process.uniEnv.BASE_API  + state.userInfo.avatar
                } 
            }
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
