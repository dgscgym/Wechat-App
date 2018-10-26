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
    phonenumber: function (e) {
      var that = this;
      that.setData({
        phonenumber: e.detail.value
      })
    },
     neibuma: function (e) {
      var that = this;
      that.setData({
        neibuma: e.detail.value
      })
    },
    identifyingcode: function (e) {
      var that = this;
      that.setData({
        identifyingcode: e.detail.value
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
    formSubmit: function (e) {
      var that = this;
      var tokend = wx.getStorageSync('tokend')
      var username1 = e.detail.value.username1
      var password1 = e.detail.value.password1
      var phonenumber1 = e.detail.value.phonenumber1
      var neibuma1 = e.detail.value.neibuma1
      var username = that.data.username ? that.data.username : username1
      var password = that.data.password ? that.data.password : password1
      var phonenumber = that.data.phonenumber ? that.data.phonenumber : phonenumber1
      var neibuma = that.data.neibuma ? that.data.neibuma : neibuma1
      wx.request({
        url: 'http://localhost:8080/Amess/servlet/text',
        data: {
          username: username,
          password: password,
          phonenumber:phonenumber,
          neibuma:neibuma
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if(phonenumber.length==11&&res.data=="{code:2}")
          {
            (phonenumber.length == 11 && res.data == "{code:2}")
            {
              wx.showModal({
                title: '提示',
                content: '验证码已发送',
                showCancel: false,
                confirmText: '返回',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击了“返回”')
                  }
                }
              })
            }
          }
          else if(res.data=="{code:3}")
          {
              wx.showModal({
                title: '提示',
                content: '该手机号码已被注册，请直接登录',
                showCancel: false,
                confirmText: '返回',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击了“返回”')
                  }
                }
              })
          }
          else
          {
              wx.showModal({
                title: '警告',
                content: '请输入正确的手机号',
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
        }
      })
      this.setData(app.globalData);

    },
    formSubmit1: function (e) {
      var that = this;
      var tokend = wx.getStorageSync('tokend')
      var identifyingcode1 = e.detail.value.identifyingcode1
      var identifyingcode = that.data.identifyingcode ? that.data.identifyingcode : identifyingcode1
      wx.request({
        url: 'http://localhost:8080/Amess/servlet/text',
        data: {
          identifyingcode: identifyingcode
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data == "{code:2}") {
            wx.showModal({
              title: '提示',
              content: '注册成功！',
              showCancel: false,
              confirmText: '进入界面',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../photos/photos',
                  })
                }
              }
            })
          }
          else {
            wx.showModal({
              title: '警告',
              content: '您输入的验证码有误，请重新输入',
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
        }
      })
      this.setData(app.globalData);
    }
  }
)