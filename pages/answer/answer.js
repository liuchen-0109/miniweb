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
        showButton: false,
        active: false,
        backcolor: '',
        act_one_1: '#ccc',
        act_one_2: '#ccc',
        act_one_3: '#ccc',
        act_two_1: '#ccc',
        act_two_2: '#ccc',
        act_two_3: '#ccc',
        act_three_1: '#ccc',
        act_three_2: '#ccc',
        act_three_3: '#ccc',
    },
    request_data: {
        pid: '',
        one: 0,
        two: 0,
        three: 0,
    },
    onLoad: function (res) {
        if (res.id == undefined || res.id == null || !res.id) {
            app.showErrorMsg('获取数据失败', 1500);
            return;
        }
        wx.showLoading({
            title: '数据加载中',
        });
        var that = this;
        wx.request({
            method: "POST",
            dataType: 'json',
            url: config.service.getQuestionUrl,
            data: {'id': res.id},
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
                wx.hideLoading();
            },
            fail: function (res) {
                wx.hideLoading();
                app.showErrorMsg('网络连接失败，请刷新重试', 1500);
            }
        })
    },
    ans_one: function (e) {
        var key = this.request_data.one = e.currentTarget.dataset.value;
        this.changeColoe(1, key);
        console.log(this.data.num)
        if (this.data.num > 1) {

            if (this.data.num == 2) {
                if (this.request_data.one && this.request_data.two) {
                    this.setData({
                        showButton: true
                    });
                }
            } else if (this.data.num == 3) {
                if (this.request_data.one && this.request_data.two && this.request_data.three) {
                    this.setData({
                        showButton: true
                    });
                }
            }
            this.setData({
                currentTab: 1
            });
        }else {
            this.setData({showButton: true})
        }
    }
    ,
    ans_two: function (e) {
        var key = this.request_data.two = e.currentTarget.dataset.value;
        this.changeColoe(2, key);
        if (this.data.num > 2) {
            this.setData({
                currentTab: 2
            });
        } else {
            if ((this.request_data.one && this.request_data.two) || (this.request_data.one && this.request_data.two && this.request_data.three)) {
                this.setData({showButton: true})
            }
        }
    }
    ,
    ans_three: function (e) {
        var key = this.request_data.three = e.currentTarget.dataset.value;
        this.changeColoe(3, key);
        if (this.request_data.one && this.request_data.two && this.request_data.three) {
            this.setData({showButton: true})
        }

    }
    ,
    makeAnswer: function () {
        this.request_data.openid = app.globalData.openid
        this.showModel('小提示', '您将提交回答，提交后不可修改哦~', '确认提交', '返回修改')
    }
    ,
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
                        dataType: 'json',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: "POST",
                        url: 'https://wen.turbochen.xyz/answer/create_answer',
                        data: that.request_data,

                        success: function (res) {
                            if (res.data.code == 1) {
                                app.showErrorMsg(res.data.msg, 1500);
                                wx.hideLoading();
                                that.setData({active: false})
                            } else {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                });
                                wx.redirectTo({url: '/pages/answerfinish/answerfinish'})
                                wx.hideLoading();
                                that.setData({active: false});
                            }

                        },
                        fail: function () {
                            app.showErrorMsg('网络连接失败', 1500);
                            wx.hideLoading();
                            that.setData({active: false})
                        }
                    });

                } else if (res.cancel) {
                }
            }
        })
    }
    ,
    changeColoe: function (type, key) {
        var color = 'blue';
        if (type == 1) {
            this.setData({
                act_one_1: '',
                act_one_2: '',
                act_one_3: '',
            })
            if (key == 1) {
                this.setData({
                    act_one_1: color,
                })
            } else if (key == 2) {
                this.setData({
                    act_one_2: color,
                })
            } else {
                this.setData({
                    act_one_3: color,
                })
            }
        } else if (type == 2) {
            this.setData({
                act_two_1: '',
                act_two_2: '',
                act_two_3: '',
            })
            if (key == 1) {
                this.setData({
                    act_two_1: color,
                })
            } else if (key == 2) {
                this.setData({
                    act_two_2: color,
                })
            } else {
                this.setData({
                    act_two_3: color,
                })
            }
        } else {
            this.setData({
                act_three_1: '',
                act_three_2: '',
                act_three_3: '',
            })
            if (key == 1) {
                this.setData({
                    act_three_1: color,
                })
            } else if (key == 2) {
                this.setData({
                    act_three_2: color,
                })
            } else {
                this.setData({
                    act_three_3: color,
                })
            }
        }
    },
    onShareAppMessage(res) {
        return {
            title: app.globalData.shareTitle,
            imageUrl:app.globalData.shareImage,
            path: '/pages/index/index?openid='+app.globalData.openid
        }
    }
})