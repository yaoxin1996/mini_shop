import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },
  // 获取用户信息
  handleGetUserInfo (e) {
    console.log(e);
    // 获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail
    // 获取小程序登录成功后的code
    wx.login({
      timeout: 10000,
      success: (res) => {
        const {code} = res
        const loginParams = {encryptedData, rawData, iv, signature, code}
        // 发送请求获取用户的token值
        request({url: '/users/wxlogin', data: loginParams, method: 'post'}).then(res => {
          // 获取token，存到storage
          console.log(res);
          wx.setStorageSync('token', 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
          // 跳转回支付页面
          wx.navigateTo({
            url: '/pages/pay/index'
          })
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})