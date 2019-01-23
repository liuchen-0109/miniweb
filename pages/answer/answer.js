var config = require('../../config')

var app = getApp();

Page({
    data:{
        total_num:'',
        current_num:'',
        title:'',
        one:'',
        two:'',
        three:'',
    },
    onLoad:function(){
      wx.request({
          method:"POST",
          dataType:'json',
          url:config.service.getQuestionUrl,
          data:{'id':1},
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            console.log(res)
          },
          fail:function(res){
              app.showErrorMsg('网络连接失败，请刷新重试',1500);
          }
      })
    }
})