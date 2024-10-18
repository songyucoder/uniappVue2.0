# uniappVue2.0
利用uniapp框架使用vue2的app框架，适用于多端适配：iOS、android、H5、各类小程序的模版框架，适应于新手能快速上手！！！！

# 在开发过程中，常用的的组件，基础类进行了封装,框架样式采用flex布局，以下为封装的类库

- 请求框架
- 应用分包处理
- 环境配置项:
 ```shell
 ;(function () {
    const NODE_ENV = 'dev' 
    let ENV_VAR = null
    console.log('ferertgtrg')
    if (process.env.NODE_ENV === 'development') {
        if (NODE_ENV === 'dev') {
            ENV_VAR = require('.env.local')
        } else if (NODE_ENV === 'test') {
            ENV_VAR = require('.env.dev.js')
        }
    } else if (process.env.NODE_ENV === 'production') {
        ENV_VAR = require('.env.prod.js')
    }

    if (ENV_VAR) {
        process.uniEnv = {}
        for (let key in ENV_VAR) {
            process.uniEnv[key] = ENV_VAR[key]
        }
    }
})()
 ```
 
 
 ### 说明如下：
    - NODE_ENV 总体分为 development 和 production 环境
	- 需要创建 文件 .env.local、.env.dev.js、.env.prod.js
	- 注意local配置是关联本地的host，适用于本地调试使用，这里需要后端环境配置支持，以Mac（Windows没有可自行谷歌一下，因为Windows不适合做开发）为例参考：[](https://blog.csdn.net/qq_22200671/article/details/109223464)


- 数据持久化，登录信息单例保存与使用 参考如下
  - 在main.js 文件中导入：import store from './store'
  - 存储的使用 this.$store.commit('login', 登录后返回的信息data)
  - 取刚才存的收据  this.$store.getters.userInfo
   
- CSS全局样式使用-
- 请参考 mine.vue 这个类的使用
- ColorUI 使用参考：[](https://github.com/Color-UI/)


 ### 请查看 vue3版本的样例  vue2 不维护了 不维护了 不维护了：
