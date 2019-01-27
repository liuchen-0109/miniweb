App({
    globalData: {
        userInfo: [],
        openid:'',
        shareTitle:'这是一个神奇的小程序',
        shareImage:'/images/apple.jpg',
    },


    showErrorMsg: function (msg, duration) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: duration,
            mask: true
        });
    },


})