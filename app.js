App({
    globalData: {
        userInfo: [],
        openid:'',
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