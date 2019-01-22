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
    },
    create: function () {
        var data = this.check();
        if(data.length > 0){
            //查询合格数据个数
            var length = data.length;
            var content = "您将完整创建"+length+"道题目，如需添加请返回修改。";
           this.showModel('创建题目',content,'确认创建','返回修改')
        }else{
            this.showErrorMsg("您还没有创建完整题目，每道题目必须有三个完整答案哦~",3000);
        }
    },
    showErrorMsg: function (msg,duration) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: duration,
            mask: true
        });
    },
    showModel:function(title,content,confirm,cancel){
        wx.showModal({
            title: title,
            content: content,
            confirmText: confirm,
            cancelText: cancel,
            success: function(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '数据处理中',
                    }),
                    setTimeout(function(){
                        wx.hideLoading()
                    },2000)
                } else if (res.cancel) {
                }
            }
        })
    },
    check:function(){
        var data = [];
        var array = [];
        if(this.globalData.title_one && this.globalData.one_A && this.globalData.one_A && this.globalData.one_C ){
            array['title'] = this.globalData.title_one;
            array['A'] = this.globalData.one_A;
            array['B'] = this.globalData.one_B;
            array['C'] = this.globalData.one_C;
            data.push(array);
        }
        if(this.globalData.title_two && this.globalData.two_A && this.globalData.two_B && this.globalData.two_C ){
            array['title'] = this.globalData.title_two;
            array['A'] = this.globalData.two_A;
            array['B'] = this.globalData.two_B;
            array['C'] = this.globalData.two_C;
            data.push(array);
        }
        if(this.globalData.title_three && this.globalData.three_A && this.globalData.three_A && this.globalData.three_C ){
            array['title'] = this.globalData.title_three;
            array['A'] = this.globalData.three_A;
            array['B'] = this.globalData.three_A;
            array['C'] = this.globalData.three_C;
            data.push(array);
        }
        return data;
    }

})