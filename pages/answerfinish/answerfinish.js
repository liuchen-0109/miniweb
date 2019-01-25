var app = getApp();

Page({
    toCreate:function(){
        wx.redirectTo({url:'/pages/question/question'})
    },
    share:function(){
        console.log('share')
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: '/pages/index/index?id=123'
        }
    }
})