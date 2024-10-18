<script>
	// import socketIO from '@/config/socket.js'
	import {
		postUserInfoApi
	} from '@/api/mine/index.js'
	export default {
		methods: {
			// initSocket(e) {
			// 	this.$socket.connectSocketInit({
			// 		type: 'login',
			// 		token: uni.getStorageSync('token')
			// 	})
			// },
		},
		
	 	onLaunch: async function() {
			console.log('App Launch')
			
			// 获取最新的用户信息
			if (uni.getStorageSync('token')) {
				// 异步先拿
				this.$store.commit('login', uni.getStorageSync('userInfo'))
				const res = await postUserInfoApi()
				if (res.code == 0) {
					this.$store.commit('login', res.data)
					// this.initSocket(res.data) 对scoket的使用
				}
			
			} else {
				// 没有登录的情况
			
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import '@/style/index.scss';
</style>
