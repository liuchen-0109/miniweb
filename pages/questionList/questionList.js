var app = getApp();

Page({
    data: {
        data_list: [],
        page: 1,
    },
    onReachBottom: function () {
        this.getData(2);//下拉加载时调用方法
    },
    onLoad: function (res) {
        //读取数据
        try {
            var data_list = wx.getStorageSync('question_list');
            this.setData({data_list: data_list})
        } catch (e) {
            app.showErrorMsg('读取数据失败', 1500);
            return;
        }
        if (res.is_request == 0) {
            this.setData({page:1})
            this.getData(1);//取的是缓存数据 需要获取最新数据覆盖
        }else{
            this.setData({page:++this.data.page})

        }

    },
    getData: function (type) {
       if(type==2) wx.showLoading({
            title: '加载中',
        })

        var that = this;
        wx.request({
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://wen.turbochen.xyz/question/question_list',
            data: {openid: app.globalData.openid, size: 20, page: that.data.page},
            success: function (res) {
                try {
                    if (type == 1) {
                        that.setData({
                            data_list: res.data.data,
                        })

                        wx.setStorageSync('question_list', that.data.data_list);
                    } else {
                        that.setData({
                            data_list: that.data.data_list.concat(res.data.data),
                        })
                        wx.setStorageSync('question_list', that.data.data_list);
                    }
                    if(type == 2) wx.hideLoading()
                    if (res.data.data.length > 0) {
                        that.setData({page: that.data.page + 1})
                       if(type != 1) app.showErrorMsg('数据已加载',1000)
                    }else {
                        app.showErrorMsg('没有更多数据了～',1500)
                    }

                } catch (e) {
                    app.showErrorMsg('更新数据失败，请刷新重试', 1500);
                    if(type == 2) wx.hideLoading()
                }

            },
            fail: function () {
                app.showErrorMsg("网络错误，更新数据失败", 1500);
            }
        })
    }
})