App({
    globalData: {
        title_one: '',
        one_A: '',
        one_B: '',
        one_C: '',
        title_two: '',
        two_A: '',
        two_B: '',
        two_C: '',
        title_three: '',
        three_A: '',
        three_B: '',
        three_C: '',
        userInfo: [],
        openid:'',
    },
    create: function (that) {
        var data = this.check();
        if (data.length > 0) {
            //查询合格数据个数
            var length = data.length;
            var content = "您将完整创建" + length + "道题目，如需添加请返回修改。";
            this.showModel( that,'创建题目', content, '确认创建', '返回修改')
        } else {
            this.showErrorMsg("您还没有创建完整题目，每道题目必须有三个完整答案哦~", 3000);
        }
    },

    showErrorMsg: function (msg, duration) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: duration,
            mask: true
        });
    },
    check: function () {
        var data = [];
        var array = [];
        if (this.is_none(this.globalData.title_one, this.globalData.one_A, this.globalData.one_B, this.globalData.one_C)) {
            array["title"] = this.globalData.title_one;
            array["A"] = this.globalData.one_A;
            array["B"] = this.globalData.one_B;
            array["C"] = this.globalData.one_C;
            data.push(array);
        }
        if (this.is_none(this.globalData.title_two, this.globalData.two_A, this.globalData.two_B, this.globalData.two_C)) {
            array['title'] = this.globalData.title_two;
            array['A'] = this.globalData.two_A;
            array['B'] = this.globalData.two_B;
            array['C'] = this.globalData.two_C;
            data.push(array);
        }
        if (this.is_none(this.globalData.title_three, this.globalData.three_A, this.globalData.three_A, this.globalData.three_C)) {
            array['title'] = this.globalData.title_three;
            array['A'] = this.globalData.three_A;
            array['B'] = this.globalData.three_A;
            array['C'] = this.globalData.three_C;
            data.push(array);
        }
        return data;
    },
    is_none: function (a, b, c, d) {
        if (a === undefined || a === '' || !a) return false;
        if (b === undefined || b === '' || !b) return false;
        if (c === undefined || c === '' || !c) return false;
        if (d === undefined || d === '' || !d) return false;
        return true;
    },
    showModel: function (that,title, content, confirm, cancel) {
        wx.showModal({
            title: title,
            content: content,
            confirmText: confirm,
            cancelText: cancel,
            success: function (res) {
                var global = getApp();
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
                        url: 'https://wen.turbochen.xyz/question',
                        data: global.globalData,

                        success: function (res) {
                            if(res.code){
                                global.showErrorMsg(res.msg,1500);
                                wx.hideLoading();
                                that.setData({active: false})
                            }else{
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                });
                                wx.hideLoading();
                                that.setData({active: false})
                            }

                        },
                        fail: function () {
                            global.showErrorMsg('网络连接失败',1500);

                            wx.hideLoading();
                            that.setData({active: false})
                        }
                    });

                } else if (res.cancel) {
                }
            }
        })
    },
    //字数限制
    title_inputs: function (e, that) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);

        //最少字数限制
        if (len < that.data.title_min)
            that.setData({
                texts_title: '字数不够哦~'
            })
        else if (len >= that.data.title_min)
            that.setData({
                texts_title: " "
            })

        //最多字数限制
        if (len > that.data.title_max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
        that.setData({
            currentWordNumber: len //当前字数
        });
    },
    checkTitle: function (that) {
        var title_one = this.globalData.title_one;
        var title_two = this.globalData.title_two;
        var title_three = this.globalData.title_three;
        var title_min = that.data.title_min;
        if (title_one && title_one.length < title_min) {
            return [0, '第一题题目少于' + title_min + '字'];
        } else if (title_two && title_two.length < title_min) {
            return [0, '第二题题目少于' + title_min + '字'];
        } else if (title_three && title_three.length < title_min) {
        } else if (title_three && title_three.length < title_min) {
            return [0, '第三题题目少于' + title_min + '字'];
        } else if (!title_three && !title_one && !title_two) {
            return [0, '您未设置题目']
        }
        return [1, '标题检查通过']
    },

})