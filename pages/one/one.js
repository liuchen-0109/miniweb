var app = getApp();

Page({
    data: {
        title_min: 5,
        title_max: 90,
        min: 1,
        max: 30,
        title: '',
        input_one: '',
        input_two: '',
        input_three: '',
        texts_title: '',
        texts_A: '',
        texts_B: '',
        texts_C: '',
        active: false,
    },
    onLoad: function () {
        this.setData({
            title: app.globalData.title_one,
            input_one: app.globalData.one_A,
            input_two: app.globalData.one_B,
            input_three: app.globalData.one_C,
        });
    },
    input_title: function (e) {//获取标题
        app.globalData.title_one = e.detail.value;
        app.title_inputs(e,this);

    },
    input_one: function (e) {//问题A
        app.globalData.one_A = e.detail.value;
    },
    input_two: function (e) {//问题B
        app.globalData.one_B = e.detail.value;
    },
    input_three: function (e) {//问题C
        app.globalData.one_C = e.detail.value;
    },
    create: function () {//创建题目
        var check_title_res = app.checkTitle(this);
        if (check_title_res[0] == 0) {
            app.showErrorMsg(check_title_res[1], 1500);
            return
        }
        app.create(this);

    },
    nextAnswer: function () {//下一题
        wx.navigateTo({url: '/pages/two/two'}) // 跳转下一页
    },

    checkTitle: function () {
        var title_one = app.globalData.title_one;
        var title_two = app.globalData.title_two;
        var title_three = app.globalData.title_three;
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


})