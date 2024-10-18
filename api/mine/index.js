import request from '@/utils/request'
const postLoginWXApi =(data)=> { // 微信登录
    return request({
        url: `/api/login/wx`,
        method: 'POST',
		data
    })
}
const postUserInfoApi =()=> {
    return request({
        url: `/api/userInfo`,
        method: 'POST',
    })
}

const postUserInfoUpdateApi=(data)=>{
    return request({
        url: `/api/user/update`,
        method: 'POST',
        data
    })
}

// 更新企业认证
const putenterpriseUpdateApi=(data)=>{
    return request({
        url: `/api/enterprise/update`,
        method: 'PUT',
        data
    })
}
//  获取企业的认证状态
const getenterpriseApi=()=>{
    return request({
        url: `/api/enterprise`,
        method: 'GET'
    })
}

//  获取我的店铺
const getmyBusinessApi=(data)=>{
    return request({
        url: `/api/business-hall/myBusiness`,
        method: 'GET',
		data
    })
}

// 更新我的店铺
const putEditmyBusinessApi=(id,data)=>{
    return request({
        url: `/api/business-hall/update/${id}`,
        method: 'PUT',
        data
    })
}

// 删除我的店铺
const putdeltmyBusinessApi=(id,data)=>{
    return request({
        url: `/api/business-hall/del/${id}`,
        method: 'POST'
    })
}

//api/project-hall/myProject -我的求租
const getmyProjectApi=(data)=>{
    return request({
        url: `/api/project-hall/myProject`,
        method: 'GET',
		data
    })
}

// 更新我的求租
const putEditProjectApi=(id,data)=>{
    return request({
        url: `/api/project-hall/update/${id}`,
        method: 'PUT',
        data
    })
}

// 删除我的求租
const putDelEditProjectApi=(id,data)=>{
    return request({
        url: `/api/project-hall/del/${id}`,
        method: 'POST',
        data
    })
}


// 添加留言反馈
const postFeedbackApi=(data)=>{
    return request({
        url: `/api/feedback`,
        method: 'POST',
		data
    })
}

// 浏 /api/foot-mark
const getFootMarkApi=(data)=>{
    return request({
        url: `/api/foot-mark`,
        method: 'GET',
		data
    })
}

export  {
    postLoginWXApi,
    postUserInfoApi,
	postUserInfoUpdateApi,
	putenterpriseUpdateApi,
	getenterpriseApi,
	getmyBusinessApi,
	putEditmyBusinessApi,
	getmyProjectApi,
	putEditProjectApi,
	postFeedbackApi,
	getFootMarkApi,
	putdeltmyBusinessApi,
	putDelEditProjectApi
}