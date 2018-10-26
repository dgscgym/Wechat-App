var app = getApp()
Page({
  data: { show: "", }, 
  onLoad: function () { 
    console.log('onLoad') }, 
    click: function () {
    var that = this; 
    var show; 
    wx.scanCode({
      success: (res) => {
      this.show = "结果:" + res.result; 
      that.setData({ show: this.show })
        wx.showToast({ title: '成功', icon: 'success', duration: 2000 })
      }, 
      fail: 
        (res) => { wx.showToast({ title: '失败', icon: 'success', duration: 2000 }) }, 
        complete: (res) => { }
    })
  }
})