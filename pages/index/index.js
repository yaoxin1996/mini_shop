// 引入用来发送请求的方法
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList () {
    request({url: '/home/swiperdata'}).then(res => {
      const list = res.data.message
      list.forEach(v => {
        v.navigator_url = v.navigator_url.replace('main', 'index')
      });
      this.setData({
        swiperList: list
      })
    })
  },
  // 获取导航数据
  getCatesList () {
    request({url: '/home/catitems'}).then(res => {
      this.setData({
        catesList: res.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList () {
    request({url: '/home/floordata'}).then(res => {
      const floor = res.data.message
      console.log(floor);
      floor.forEach(v => {
        v.product_list.forEach(item => {
          item.navigator_url = item.navigator_url.replace('/pages/goods_list', '/pages/goods_list/index')
        })
      })
      console.log(floor);
      this.setData({
        floorList: floor
      })
    })
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