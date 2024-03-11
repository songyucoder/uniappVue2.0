import { getAuthorization } from '@/utils/auth'

// 白名单 
const whiteList = [
  '/', // 注意入口页必须直接写 '/'
  '/pages/login/login',
  '/pagesUser/findPassWord/findPassWord', // 忘记密码
  '/pagesUser/passWordSet/passWordSet', // 密码设置修改
  '/pagesUser/protocol/protocol', // 用户协议
  '/pages/index/index', // 首页模块
  '/pages/index/steerShow', // APP首屏显示
  '/pages/news/list',   // 资讯模块
  '/pages/news/news',   // 资讯详情模块
  '/pagesNews/recommend/index',  // 圈子模块【动态列表】
  '/pages/forum/forum',  // 动态详情
  '/pages/user/user',  // 用户中心
  '/pages/category/category',  // 商品分类
  '/pagesGoods/search/search',  // 商品搜索
  '/pagesGoods/goods/goods',  // 商品列表
  '/pagesGoods/detail/detail',  // 商品详情
]

export default async function() {
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  /* 拦截uni.switchTab本身没有问题。
  但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。
  所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。
  */
  list.forEach(item => {
    uni.addInterceptor(item, {
      invoke(e) {
        // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
		console.log(item);
		console.log(e)
        const url = e.url.split('?')[0]
        console.log('url', url)

        // 判断当前窗口是白名单，如果是则不重定向路由
        let pass
        if (whiteList) {
          pass = whiteList.some((item) => {
            if (typeof (item) === 'object' && item.pattern) {
              return item.pattern.test(url)
            }
            return url === item
          })
        }
        // 不是白名单并且没有token
        if (!pass && !getAuthorization()) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          uni.navigateTo({
            url: "/pages/login/login"
          })
          return false
        }
        return e
      },
      fail(err) { // 失败回调拦截
        console.log('ddcju')
        console.log(err)
      }
    })
  })
}