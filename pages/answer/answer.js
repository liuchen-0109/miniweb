var config = require('../../config')

var app = getApp();

Page({
    data: {
        total_num: '',
        current_num: '',
        question: '',
        title: '',
        one: '',
        two: '',
        three: '',
        type: '',
        show_two: false,
        show_three: false,
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
                // this.data.total_num = res.length;
                // this.setData({question:res.data.question});
                if (res.data.code == 1) {
                    app.showErrorMsg(res.data.msg, 1500);
                    return;
                }
                var r_data = res.data.data;
                var num = 0;
                for (var index in r_data.question) {
                    num++;
                    if (num == 1) {
                        that.setData({
                            question: r_data.question,
                            title: r_data.question.one.title,
                            one: r_data.question.one.A,
                            two: r_data.question.one.B,
                            three: r_data.question.one.C,
                            type: r_data.type,
                        });
                    } else if (num == 2) {
                        that.setData({
                            question: r_data.question,
                            title: r_data.question.one.title,
                            one: r_data.question.one.A,
                            two: r_data.question.one.B,
                            three: r_data.question.one.C,
                            type: r_data.type,
                            show_two: true,
                        })
                    } else if (num == 3) {
                        that.setData({
                            question: r_data.question,
                            title: r_data.question.one.title,
                            one: r_data.question.one.A,
                            two: r_data.question.one.B,
                            three: r_data.question.one.C,
                            type: r_data.type,
                            show_two: true,
                            show_three: true,
                        });
                    }
                    console.log(r_data.question[index])
                    console.log(num)
                }
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
    touch_title: function () {
        console.log(1);
    }
})