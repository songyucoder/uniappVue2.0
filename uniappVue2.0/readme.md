hello uni-app x 是 uni-app x 项目的演示工程。

uni-app x [开发文档](https://uniapp.dcloud.net.cn/uni-app-x/)

### 自动化测试
项目下的js文件为自动化测试的nodejs文件，uni-app x手机端没有js引擎，是纯原生的。[自动化测试详见](https://uniapp.dcloud.net.cn/worktile/auto/quick-start.html)

#### 页面截图对比测试
测试用例文件路径：pages/pages.test.js  

其中 pages 变量中保存了所有需要截图对比测试的页面地址，如果有新增示例页面需要截图对比测试将页面地址添加到此变量即可。

**注意**
- 添加到截图对比测试的页面列表，修改内容涉及到变更，需要在测试平台删除基准图
- 动态内容页面不适合截图对比测试，不要添加到截图对比测试的页面列表中
