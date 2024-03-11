class socketIO {
    constructor(time) {
        this.socketTask = null
        this.is_open_socket = false //避免重复连接
        this.url = process.uniEnv.BASE_SOCKET_URL //连接地址
        this.data = {}
        this.userTokenMap = {}
        this.connectNum = 1 // 重连次数
        this.is_hand_socket = false //是否为手动断开
        //心跳检测
        this.timeout = time ? time : 50000 //多少秒执行检测
        this.heartbeatInterval = null //检测服务器端是否还活着
        this.reconnectTimeOut = null //重连之后多久再次重连
    }
    // 进入这个页面的时候创建websocket连接【整个页面随时使用】
    connectSocketInit(data) {
        
        this.userTokenMap = data
        this.socketTask = uni.connectSocket({
            url: this.url,
            success: () => {
                console.log('正准备建立websocket中...')
                // 返回实例
                return this.socketTask
            }
        })
        this.socketTask.onOpen((res) => {
            this.connectNum = 1
            console.log('WebSocket连接正常！')
            this.send(data)
            clearInterval(this.reconnectTimeOut)
            clearInterval(this.heartbeatInterval)
            this.is_open_socket = true
            this.start()
            // 注：只有连接正常打开中 ，才能正常收到消息
            this.socketTask.onMessage((e) => {
                // 字符串转json
                let res = JSON.parse(e.data)
                console.log('res---------->', res) // 这里 查看 推送过来的消息
                uni.$emit(`getPositonsOrder`, res)
            })
        })
        // 监听连接失败
        uni.onSocketError((res) => {
            console.log('WebSocket连接打开失败，请检查！')
        })
        // 这里仅是事件监听【如果socket关闭了会执行】
        // 经实测 发现在初次建立链接失败时,error与close事件监听都会触发，而在链接期间因异常情况断开时只会触发close，故将异常事件处理方法放在close中
        this.socketTask.onClose(() => {
            console.log('已经被关闭了-------')
            clearInterval(this.heartbeatInterval)
            clearInterval(this.reconnectTimeOut)
            uni.$off(`getPositonsOrder`)
            uni.$off(`connectError`)
            if (!this.is_hand_socket) {
                this.socketTask = null
                this.is_open_socket = false
                if (this.connectNum < 6) {
                    console.log(`连接失败，正尝试第${this.connectNum}次连接`);
                    // uni.showToast({
                    //     title: `连接失败，正尝试第${this.connectNum}次连接`,
                    //     icon: 'none'
                    // })
                    this.reconnect(true)
                    this.connectNum += 1
                } else {
                    console.log(`尝试连接失败，请在网络健康情况下重试`);
                    // uni.showToast({
                    //     title: `尝试连接失败，请在网络健康情况下重试`,
                    //     icon: 'none'
                    // })
                    uni.$emit(`connectError`)
                    this.connectNum = 1
                }
            }
        })
    }
    // 主动关闭socket连接
    Close() {
        if (!this.is_open_socket) {
            return
        }
        this.is_hand_socket = true
        this.socketTask.close({
            success() {
                uni.showToast({
                    title: 'SocketTask 关闭成功',
                    icon: 'none'
                })
            }
        })
    }
    //发送消息
    send(contentData, isNoData = false) {
        const data = isNoData ? contentData : { ...contentData, ...this.data }
        console.log(data, 'send----')
        // 注：只有连接正常打开中 ，才能正常成功发送消息
        if (this.socketTask) {
            this.socketTask.send({
                data: JSON.stringify(data),
                async success() {
                    console.log('消息发送成功')
                }
            })
        }
    }
    //开启心跳检测
    start() {
        this.heartbeatInterval = setInterval(() => {
            this.send(
                {
                    type: 'ping'
                },
                true
            )
        }, this.timeout)
    }
    //重新连接
    reconnect(isError) {
        //停止发送心跳
        clearInterval(this.heartbeatInterval)
        console.log(this.is_open_socket, isError, '----')
        //如果不是人为关闭的话，进行重连
        if (!this.is_open_socket && isError) {
            this.reconnectTimeOut = setTimeout(() => {
                this.connectSocketInit(this.userTokenMap)
            }, 5000)
        }
    }
    //设置data
    setdata(data) {
        this.data = data
    }
}
module.exports = socketIO
