//index.js
//获取应用实例
const app = getApp()
Page(
  {
    username: function (e) {
      var that = this;
      that.setData({
        username: e.detail.value
      })
    },
    password: function (e) {    
      var that = this;
      that.setData({
        password: e.detail.value
      })
      },
    data: {
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      disabled: false,
      plain: false
    },
    setDisabled: function (e) {
      this.setData({
        disabled: !this.data.disabled
      })
    },
    setPlain: function (e) {
      this.setData({
        plain: !this.data.plain
      })
    },
    setLoading: function (e) {
      this.setData({
        loading: !this.data.loading
      })
    },
    onGotUserInfo: function (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.userInfo)
      console.log(e.detail.rawData)
    },
   formSubmit:function(e)
      {
      var that = this;
      var tokend = wx.getStorageSync('tokend')
      var username1 = e.detail.value.username1 
      var password1 = e.detail.value.password1
      var username = that.data.username ? that.data.username : username1
      var password = that.data.password ? that.data.password :password1
        wx.request({
          url: 'http://localhost:8081/login',
        data:{
          username:username,
          password:password
        },
        header: {
          'content-type': 'application/json'
        },
        success(res){
          if (res.data == "{code:2}")
            {
              wx.showModal({
                content: '登录成功',
                showCancel: false,
                confirmText: '进入页面',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../photos/photos',
                    })
                  }
                }
         })}
          else if (res.data == "{code:1}")
                {
                  wx.showModal({
                    title: '警告',
                    content: '您输入的账户信息有误，请重新输入',
                    showCancel: false,
                    confirmText: '返回',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击了“返回”')
                      }
                    }
                  }) 
                }
          else{
            wx.showModal({
              title: '警告',
              content: '用户名和密码为空',
              showCancel: false,
              confirmText: '返回',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击了“返回”')
                }
              }
            }) 

          }
   },
          fail() {
            wx.showModal({
              title: '警告',
              content: '通信失败，请稍后再试',
              showCancel: false,
              confirmText: '返回',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击了“返回”')
                }
              }
            })
          }})},
   change1: function ()
   {   
      wx.navigateTo({
        url: '../zhuce/zhuce',
      })
   },
    change2:function () {
      wx.navigateTo({
        url: '../kuaijie/kuaijie',
      })
    }
      
  }
)