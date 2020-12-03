import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      }, {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goods_list: []
  },
  // 接口要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  // 标题点击事件 子组件传递的
  handleTabsItemChange (e) {
    const {index} = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i===index ? v.isActive=true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || ''
    this.queryParams.query = options.query || ''
    this.getGoodsList()
  },

  // 获取商品列表数据
  getGoodsList () {
    request({url: '/goods/search', data: this.queryParams}).then(res => {
      // 获取总条数
      const total = res.data.message.total
      this.totalPages = Math.ceil(total/this.queryParams.pagesize)
      this.setData({
        // 拼接数组
        goods_list: [...this.data.goods_list, ...res.data.message.goods]
      })
      // 关闭下拉刷新窗口
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否有下一页数据
    if (this.queryParams.pagenum  >= this.totalPages) {
      wx.showToast({title: '没有下一页了'})
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数据
    this.setData({
      goods_list: []
    })
    // 重置页码
    this.queryParams.pagenum = 1
    // 请求数据
    this.getGoodsList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})