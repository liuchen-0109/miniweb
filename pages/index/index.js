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
        requestResult: ''
    },
    onLoad:function(res){
        if(res.id){
            console.log(res.id)
        }
    },
    bindGetUserInfo: function () {
        if (this.data.logged) return
        var golbal = app;
        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (session) {
            qcloud.loginWithCode({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    golbal.globalData.userInfo = res;
                    golbal.globalData.openid = res.openId;

                    util.showSuccess('登录成功')
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            qcloud.login({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    golbal.globalData.userInfo = res;
                    golbal.globalData.openid = res.openId;
                    util.showSuccess('登录成功')
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
    },
    questionWeb:function(){
        wx.navigateTo({
            // url:"/pages/answer/answer"
             url:"/pages/question/question"
        })
    }
})