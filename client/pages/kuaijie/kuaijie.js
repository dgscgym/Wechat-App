// pages/kuaijie/kuaijie.js
const app = getApp()
var maxTime = 60
var currentTime = maxTime
Page(
  {
    data: {
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      plain: false
    },
    phonenumber: function (e) {
      var that = this;
      that.setData({
        phonenumber: e.detail.value
      })
    },
    identifyingcode: function (e) {
      var that = this;
      that.setData({
        identifyingcode: e.detail.value
      })
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
      var phonenumber1 = e.detail.value.phonenumber1
      var phonenumber = that.data.phonenumber ? that.data.phonenumber : phonenumber1
      wx.request({
        url: 'http://localhost:8080/Amess/servlet/text',
        data: {
          phonenumber: phonenumber
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if(phonenumber.length==11&&res.data=="{code:2}")
          {wx.showModal({
            title: '提示',
            content: '验证码已发送',
            showCancel: false,
            confirmText: '返回',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击了“返回”')
              }
            }
          })}
          else if (phonenumber.length == 11 && res.data == "{code:1}") 
          {
            wx.showModal({
              title: '警告',
              content: '该手机号尚未注册，请注册后再试',
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
            wx.showModal({
              title: '警告',
              content: '请输入正确的手机号！',
              showCancel: false,
              confirmText: '返回',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击了“返回”')
                }
              }
            })
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
          if(res.data=="{code:2}")
            {wx.showModal({
              title: '提示',
              content: '登陆成功！',
              showCancel: false,
              confirmText: '进入界面',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../photos/photos',
                  })
                }
              }
            })}
            else
            {
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