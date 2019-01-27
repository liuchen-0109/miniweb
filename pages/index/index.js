var qcloud = require('../../vendor/wafer2-client-sdk/index')
var util = require('../../utils/util.js')
var config = require('../../config')
qcloud.setLoginUrl(config.service.loginUrl)

var app = getApp()
Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        hasid: '',
    },
    onLoad: function (res) {
        if (res.id) {
            this.setData({
                hasid: res.id
            })
        }
    },
    bindGetUserInfo: function (e) {
        if (this.data.logged) return
        var golbal = app;
        util.showBusy('正在登录')

        const session = qcloud.Session.get()
        var type = e.currentTarget.dataset.type;
        var that = this
        if (session) {
            qcloud.loginWithCode({
                success: res => {

                    this.setData({userInfo: res, logged: true})
                    golbal.globalData.userInfo = res;
                    golbal.globalData.openid = res.openId;

                    util.showSuccess('登录成功')
                    if (type == 1) {
                        setTimeout(function () {
                            that.questionWeb()
                        }, 1000)
                    } else {
                        setTimeout(function () {
                            that.answerWeb()
                        }, 1000)
                    }

                },
                fail: err => {
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            qcloud.login({
                success: res => {
                    this.setData({userInfo: res, logged: true})
                    golbal.globalData.userInfo = res;
                    golbal.globalData.openid = res.openId;
                    util.showSuccess('登录成功')
                    if (type == 1) {
                        setTimeout(function () {
                            that.questionWeb()
                        }, 1000)
                    } else {
                        setTimeout(function () {
                            that.answerWeb()
                        }, 1000)
                    }
                },
                fail: err => {
                    util.showModel('登录错误', err.message)
                }
            })
        }
    },
    questionWeb: function () {
        wx.navigateTo({
            // url:"/pages/answer/answer"
            url: "/pages/question/question"
        })
    },
    answerWeb: function () {
        wx.navigateTo({
            url: "/pages/answer/answer?id=" + this.data.hasid
        })
    },
    onShareAppMessage(res) {
        return {
            title: app.globalData.shareTitle,
            imageUrl: app.globalData.shareImage,
            path: '/pages/index/index?openid=' + app.globalData.openid
        }
    },
    myQuestion() {
        try{
            var list = wx.getStorageSync('question_list');
        }catch (e) {
            app.showErrorMsg('读取数据失败',1500);
        }
        if(list){
            wx.navigateTo({
                url:'/pages/questionList/questionList?is_request=0'
            });
            return;
        }
        wx.request({
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://wen.turbochen.xyz/question/question_list',
            data: {openid: app.globalData.openid,size:20},
            success:function(res){
                try {
                    wx.setStorageSync('question_list', res.data.data);
                    wx.navigateTo({
                        url:'/pages/questionList/questionList?is_request=1'
                    });
                    return;
                }catch (e) {
                    app.showErrorMsg('存储数据失败',1500);
                }
            },
            fail:function(){
                app.showErrorMsg("网络连接失败",1500);
            }
        })
    }

})