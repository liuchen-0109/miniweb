var qcloud = require('../../vendor/wafer2-client-sdk/index')
var util = require('../../utils/util.js')
var config = require('../../config')
qcloud.setLoginUrl(config.service.loginUrl)


Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },
    bindGetUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (session) {
            qcloud.loginWithCode({
                success: res => {
                    this.setData({ userInfo: res, logged: true })
                    console.log(res);

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
            url:"/pages/question/question"
        })
    }
})