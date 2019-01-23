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
            title: app.globalData.title_three,
            input_one: app.globalData.three_A,
            input_two: app.globalData.three_B,
            input_three: app.globalData.three_C,
        });
        if (app.globalData.title_three && app.globalData.title_three.length < this.data.title_min) this.setData({texts_title: '字数不够哦~'});


    },
    input_title: function (e) {//获取标题
        app.globalData.title_three = e.detail.value;
        app.title_inputs(e,this);
    },
    input_one: function (e) {//问题A
        app.globalData.three_A = e.detail.value;
    },
    input_two: function (e) {//问题B
        app.globalData.three_B = e.detail.value;
    },
    input_three: function (e) {//问题C
        app.globalData.three_C = e.detail.value;
    },
    create: function () {//创建题目
        var check_title_res = app.checkTitle(this);
        if (check_title_res[0] == 0) {
            app.showErrorMsg(check_title_res[1], 1500);
            return
        }
        app.create(this);

    },
    beforeAnswer: function () {
        wx.navigateBack();
    }
    ,

})