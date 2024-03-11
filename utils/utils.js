module.exports = {
    // 判断是否为空
    checkNull(string) {
        var content = string
        if (content.replace(/(^\s*)|(\s*$)/g, '') == '') return true
    },
    // 时间转YY-MM-DD
    timestamp(data) {
        var date = new Date(data)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        return Y + M + D
    },
    // 图片保存
    pictureSaving(data, basis) {
        // #ifdef H5
        var oA = document.createElement('a')
        oA.download = '' // 设置下载的文件名，默认是'下载'
        oA.href = data
        document.body.appendChild(oA)
        oA.click()
        oA.remove() // 下载之后把创建的元素删除
        uni.showToast({
            title: '保存成功', //标题
            duration: 2000 //显示时间
        })
        // #endif
        // #ifndef H5
        if (basis) {
            uni.saveImageToPhotosAlbum({
                filePath: data,
                success: function () {
                    uni.showToast({
                        title: '图片保存成功',
                        icon: 'none'
                    })
                    bitmap.clear()
                }
            })
        } else {
            let base64 = data
            const bitmap = new plus.nativeObj.Bitmap('base64')
            bitmap.loadBase64Data(
                base64,
                function () {
                    const url = '_doc/' + new Date().getTime() + '.png'
                    console.log('saveHeadImgFile', url)
                    bitmap.save(
                        url,
                        {
                            overwrite: true // 是否覆盖
                            // quality: 'quality'  // 图片清晰度
                        },
                        (i) => {
                            uni.saveImageToPhotosAlbum({
                                filePath: url,
                                success: function () {
                                    uni.showToast({
                                        title: '图片保存成功',
                                        icon: 'none'
                                    })
                                    bitmap.clear()
                                }
                            })
                        },
                        (e) => {
                            uni.showToast({
                                title: '图片保存失败',
                                icon: 'none'
                            })
                            bitmap.clear()
                        }
                    )
                },
                (e) => {
                    uni.showToast({
                        title: '图片保存失败',
                        icon: 'none'
                    })
                    bitmap.clear()
                }
            )
        }

        //  #endif
    },
    // 分享功能
    // 文档地址 https://uniapp.dcloud.net.cn/api/plugins/share.html#share
    shareFriends(href, scene, title, page_url, imageUrl) {
        // #ifdef H5
        uni.showToast({
            title: '由于浏览器限制,请使用小程序或App进行分享',
            icon: 'none',
            duration: 2000
        })
        // #endif
        // #ifdef APP-PLUS
        uni.share({
            provider: 'weixin',
            scene: scene,
            type: 5,
            href: page_url,
            title,
            imageUrl,
            miniProgram: {
                id: 'gh_cdcd13f440fd',
                path: page_url,
                type: 0,
                webUrl: href
            },
            success: function (res) {
                console.log('success:' + JSON.stringify(res))
            },
            fail: function (err) {
                console.log('fail:' + JSON.stringify(err))
            }
        })
        // #endif
    },
    //图片数据处理
    imageProcessing(data) {
        // 对图片为数组的处理
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                if (item.indexOf('http') == -1) {
                    data[index] = process.uniEnv.BASE_API + item
                }
            })
            return data
        }
        if (typeof data == 'string') {
            try {
                var img_list = JSON.parse(data)
                if (typeof img_list == 'object' && img_list) {
                    img_list.forEach((item, index) => {
                        if (item.indexOf('http') == -1) {
                            img_list[index] = process.uniEnv.BASE_API + item
                        } else {
                            img_list[index] = item
                        }
                    })
                }
                return img_list
            } catch (e) {
                if (data.indexOf('http') == -1) {
                    data = process.uniEnv.BASE_API + data
                }
                return data
            }
        }
    },
    // 图片64处理
    base64Save(base64File) {
        //base64File 需要加前缀
        const fsm = wx.getFileSystemManager() //获取全局文件管理器
        let extName = base64File.match(/data\:\S+\/(\S+);/)
        if (extName) {
            //获取文件后缀
            extName = extName[1]
        }
        //获取自1970到现在的毫秒 + 文件后缀 生成文件名
        let fileName = Date.now() + '.' + extName
        return new Promise((resolve, reject) => {
            //写入文件的路径
            let filePath = wx.env.USER_DATA_PATH + '/' + fileName
            fsm.writeFile({
                filePath,
                data: base64File.replace(/^data:\S+\/\S+;base64,/, ''), //替换前缀为空
                encoding: 'base64',
                success: (res) => {
                    console.log(filePath)
                    resolve(filePath)
                },
                fail() {
                    reject('写入失败')
                }
            })
        })
    },
	//  通过url获取视频的第一帧
	getVideoBase64(url) {
	     return new Promise(function (resolve, reject) {
	       let dataURL = ''
	       let video = document.createElement('video')
	       video.setAttribute('crossOrigin', 'anonymous','Access-Control-Allow-Origin')// 处理跨域
	       video.setAttribute('src', url)
	       video.setAttribute('autoplay', true)
	       video.setAttribute('muted', true)
	       video.setAttribute('playsinline', true)
	       video.setAttribute('webkit-playsinline', true)
	       video.setAttribute('width', 400)
	       video.setAttribute('height', 240)
	       video.currentTime = 0.1
	       video.addEventListener('loadeddata', function () {
	         setTimeout(() => {
	           let canvas = document.createElement('canvas')
	           let width = video.width // canvas的尺寸和图片一样
	           let height = video.height
	           canvas.width = width
	           canvas.height = height
	           canvas.getContext('2d').drawImage(this, 0, 0, width, height) // 绘制canvas
	           dataURL = canvas.toDataURL('image/jpeg') // 转换为base64
	           resolve(dataURL)
	         }, 100)
	       })
	     })
	   },

}
