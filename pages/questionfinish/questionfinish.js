var app = getApp();

Page({
    data:{
        id:''
    },
    onLoad:function(res){
        if(res.id){
            this.setData({id:res.id})
        }
    },
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
            title: app.globalData.shareTitle,
            imageUrl:app.globalData.shareImage,
            path: '/pages/index/index?id='+this.data.id,
        }
    }
})