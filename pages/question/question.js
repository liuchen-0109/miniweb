var app = getApp();

Page({
    data: {
        title_min: 5,
        title_max: 90,
        min: 1,
        max: 30,
        texts_title_one: '',
        texts_title_two: '',
        texts_title_three: '',
        texts_one_A: '',
        texts_one_B: '',
        texts_one_C: '',
        active: false,
        currentTab: '',
    },
    request_data:{
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
        openid:'',
        userInfo:[],
    },
    input_title: function (e) {//获取标题
        this.title_inputs(e);
        if(e.currentTarget.dataset.key === 'one'){
            this.request_data.title_one = e.detail.value;
        }else if(e.currentTarget.dataset.key === 'two'){
            this.request_data.title_two = e.detail.value;
        }else{
            this.request_data.title_three = e.detail.value;
        }
    },
    input_one: function (e) {//问题A
        if(e.currentTarget.dataset.key === 'one'){
            this.request_data.one_A = e.detail.value;
        }else if(e.currentTarget.dataset.key === 'two'){
            this.request_data.two_A = e.detail.value;
        }else{
            this.request_data.three_A = e.detail.value;
        }
    },
    input_two: function (e) {//问题B
        if(e.currentTarget.dataset.key === 'one'){
            this.request_data.one_B = e.detail.value;
        }else if(e.currentTarget.dataset.key === 'two'){
            this.request_data.two_B = e.detail.value;
        }else{
            this.request_data.three_B = e.detail.value;
        }
    },
    input_three: function (e) {//问题C
        if(e.currentTarget.dataset.key === 'one'){
            this.request_data.one_C = e.detail.value;
        }else if(e.currentTarget.dataset.key === 'two'){
            this.request_data.two_C = e.detail.value;
        }else{
            this.request_data.three_C = e.detail.value;
        }
    },
    //字数限制
    title_inputs: function (e) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);
        if(e.currentTarget.dataset.key === 'one'){
            //最少字数限制
            if (len < this.data.title_min) {
                this.setData({
                    texts_title_one: '字数不够哦~'
                })
            } else if (len >= this.data.title_min) {
                this.setData({
                    texts_title_one: false
                })
            }
        }else if(e.currentTarget.dataset.key == 'two'){
            if (len < this.data.title_min) {
                this.setData({
                    texts_title_two: '字数不够哦~'
                })
            } else if (len >= this.data.title_min) {
                this.setData({
                    texts_title_two: false
                })
            }
        }else{
            if (len < this.data.title_min) {
                this.setData({
                    texts_title_three: '字数不够哦~'
                })
            } else if (len >= this.data.title_min) {
                this.setData({
                    texts_title_three: false
                })
            }
        }



        //最多字数限制
        if (len > this.data.title_max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
        this.setData({
            currentWordNumber: len //当前字数
        });
    },
    create: function () {//创建题目
        var check_title_res = this.checkTitle();
        if (check_title_res[0] == 0) {
            app.showErrorMsg(check_title_res[1], 1500);
            return
        }
        this.create_main();
    },
    nextAnswer1: function () {
        this.setData({currentTab: 1})

    },
    nextAnswer2: function () {
        this.setData({currentTab: 2})
    },
    beforeAnswer2: function () {
        this.setData({currentTab: 0})
    },
    beforeAnswer3: function () {
        this.setData({currentTab: 1})
    },
    checkTitle: function () {
        var title_one = this.request_data.title_one;
        var title_two = this.request_data.title_two;
        var title_three = this.request_data.title_three;
        var title_min = this.data.title_min;
        if (title_one && title_one.length < title_min) {
            return [0, '第一题题目少于' + title_min + '字'];
        } else if (title_two && title_two.length < title_min) {
            return [0, '第二题题目少于' + title_min + '字'];
        } else if (title_three && title_three.length < title_min) {
            return [0, '第三题题目少于' + title_min + '字'];
        } else if (!title_three && !title_one && !title_two) {
            return [0, '您未设置题目']
        }
        return [1, '标题检查通过']
    },

    create_main: function () {
        var data = this.check();
        if (data.length > 0) {
            //查询合格数据个数
            var length = data.length;
            var content = "您将完整创建" + length + "道题目，如需添加请返回修改。";
            this.showModel( '创建题目', content, '确认创建', '返回修改')
        } else {
            this.showErrorMsg("您还没有创建完整题目，每道题目必须有三个完整答案哦~", 2000);
        }
    },
    check: function () {
        var data = [];
        var array = [];
        if (this.is_none(this.request_data.title_one, this.request_data.one_A, this.request_data.one_B, this.request_data.one_C)) {
            array["title"] = this.request_data.title_one;
            array["A"] = this.request_data.one_A;
            array["B"] = this.request_data.one_B;
            array["C"] = this.request_data.one_C;
            data.push(array);
        }
        if (this.is_none(this.request_data.title_two, this.request_data.two_A, this.request_data.two_B, this.request_data.two_C)) {
            array['title'] = this.request_data.title_two;
            array['A'] = this.request_data.two_A;
            array['B'] = this.request_data.two_B;
            array['C'] = this.request_data.two_C;
            data.push(array);
        }
        if (this.is_none(this.request_data.title_three, this.request_data.three_A, this.request_data.three_A, this.request_data.three_C)) {
            array['title'] = this.request_data.title_three;
            array['A'] = this.request_data.three_A;
            array['B'] = this.request_data.three_A;
            array['C'] = this.request_data.three_C;
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
    showModel: function (title, content, confirm, cancel) {
        var that = this;
        var global = getApp();
        that.request_data.openid = global.globalData.openid;
        that.request_data.userInfo = global.globalData.userInfo;
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
                        url: 'https://wen.turbochen.xyz/question',
                        data: that.request_data,

                        success: function (res) {
                            if(res.data.code == 1){
                                global.showErrorMsg(res.data.msg,1500);
                                wx.hideLoading();
                                that.setData({active: false})
                            }else{
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                });
                                wx.redirectTo({url:'/pages/questionfinish/questionfinish?id='+res.data.data.id})
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
    showErrorMsg: function (msg, duration) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: duration,
            mask: true
        });
    },
    onShareAppMessage(res) {
        return {
            title: '自定义转发标题',
            path: '/pages/index/index?openid='+app.globalData.openid
        }
    }
})