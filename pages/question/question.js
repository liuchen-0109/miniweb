
Page({
    data: {
        min:5,//最少字数
        max: 90, //最多字数 (根据自己需求改变)
    },

    //字数限制
    inputs: function (e) {
        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);

        //最少字数限制
        if(len <= this.data.min)
            this.setData({
               //todu
            })
        else if(len > this.data.min)
            this.setData({
                texts: " "
            })

        //最多字数限制
        if(len > this.data.max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
        this.setData({
            currentWordNumber: len //当前字数
        });
    }
})