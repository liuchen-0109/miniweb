var app = getApp();

Page({
    data: {
        title_min: 5,
        title_max: 90,
        min:1,
        max:30,
        title: '',
        input_one: '',
        input_two: '',
        input_three: '',
        texts_title:'',
        texts_A: '',
        texts_B: '',
        texts_C: '',
        active:app.globalData.active,
    },
    onLoad:function(){
        this.setData({
            title:app.globalData.title_one,
            input_one: app.globalData.one_A,
            input_two: app.globalData.one_B,
            input_three: app.globalData.one_C,
        });
    },
    input_title: function (e) {//获取标题
        app.globalData.title_one = e.detail.value;
        this.title_inputs(e);

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
        app.create();
    },
    nextAnswer: function () {//下一题
        wx.navigateTo({url: '/pages/two/two'}) // 跳转下一页
    },
    //字数限制
    title_inputs: function (e) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);

        //最少字数限制
        if (len <= this.data.title_min)
            this.setData({
                texts_title:'字数不够哦~'
            })
        else if (len >= this.data.title_min)
            this.setData({
                texts_title: " "
            })

        //最多字数限制
        if (len > this.data.title_max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
        this.setData({
            currentWordNumber: len //当前字数
        });
    }
})