var config = require('../../config')

var app = getApp();

Page({
    data: {
        total_num: '',
        current_num: '',
        question: '',
        title1: '',
        one1: '',
        two1: '',
        three1: '',
        title2: '',
        one2: '',
        two2: '',
        three2: '',
        title3: '',
        one3: '',
        two3: '',
        three3: '',
        type: '',
        show_two: false,
        show_three: false,
        currentTab: '',
        showButton:false,
        active:false,
    },
    request_data:{
        pid:'',
        one:0,
        two:0,
        three:0,
    },
    onLoad: function () {
        var that = this;
        wx.request({
            method: "POST",
            dataType: 'json',
            url: config.service.getQuestionUrl,
            data: {'id': 1},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

                if (res.data.code == 1) {
                    app.showErrorMsg(res.data.msg, 1500);
                    return;
                }
                var r_data = res.data.data;
                that.request_data.pid = r_data.id;
                var num = 0;
                for (var index in r_data.question) {
                    num++;
                    if (num == 1) {
                        that.setData({
                            question: r_data.question,
                            title1: r_data.question.one.title,
                            one1: r_data.question.one.A,
                            two1: r_data.question.one.B,
                            three1: r_data.question.one.C,
                        });
                    } else if (num == 2) {
                        that.setData({
                            question: r_data.question,
                            title2: r_data.question.two.title,
                            one2: r_data.question.two.A,
                            two2: r_data.question.two.B,
                            three2: r_data.question.two.C,
                            type: r_data.type,
                            show_two: true,
                        })
                    } else if (num == 3) {
                        that.setData({
                            question: r_data.question,
                            title3: r_data.question.three.title,
                            one3: r_data.question.three.A,
                            two3: r_data.question.three.B,
                            three3: r_data.question.three.C,
                            show_two: true,
                            show_three: true,
                        });
                    }
                }
                that.setData({num: num});
                if (r_data.question.length == 0) {
                    app.showErrorMsg('暂无数据', 1500);
                    return
                }
            },
            fail: function (res) {
                app.showErrorMsg('网络连接失败，请刷新重试', 1500);
            }
        })
    },
    ans_one: function (e) {
        this.request_data.one = e.currentTarget.dataset.value;
        if(this.data.num>1){
            this.setData({
                currentTab:1
            });
        }else{
            this.setData({showButton:true})
        }
    },
    ans_two:function(e){
        this.request_data.two = e.currentTarget.dataset.value;
        if(this.data.num>2){
            this.setData({
                currentTab:2
            });
        }else{
            if(this.request_data.one && this.request_data.two){
                this.setData({showButton:true})
            }
        }
    },
    ans_three:function(e){
        this.request_data.three = e.currentTarget.dataset.value;
        if(this.request_data.one && this.request_data.two && this.request_data.three){
            this.setData({showButton:true})
        }

    },
    makeAnswer:function(){
        this.request_data.openid = app.globalData.openid
        this.showModel('小提示','您将提交回答，提交后不可修改哦~','确认提交','返回修改')
    },
    showModel: function (title, content, confirm, cancel) {
        var that = this;

        wx.showModal({
            title: title,
            content: content,
            confirmText: confirm,
            cancelText: cancel,
            success: function (res) {
                if (res.confirm) {
                    that.setData({active: true});
                    wx.showLoading({
                        title: '数据处理中',
                    });
                    wx.request({
                        dataType:'json',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: "POST",
                        url: 'https://wen.turbochen.xyz/answer/create_answer',
                        data: that.request_data,

                        success: function (res) {
                            if(res.data.code == 1){
                                app.showErrorMsg(res.data.msg,1500);
                                wx.hideLoading();
                                that.setData({active: false})
                            }else{
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                });
                                wx.hideLoading();
                                that.setData({active: false})
                            }

                        },
                        fail: function () {
                            app.showErrorMsg('网络连接失败',1500);
                            wx.hideLoading();
                            that.setData({active: false})
                        }
                    });

                } else if (res.cancel) {
                }
            }
        })
    },

})