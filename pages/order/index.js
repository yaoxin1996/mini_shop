import { request } from '../../request/index'

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      }, {
        id: 1,
        value: '待付款',
        isActive: false
      }, {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
  },
  // 根据标题索引来激活选中标题数组
  changeTitleByIndex (index) {
    let {tabs} = this.data
    tabs.forEach((v, i) => i===index ? v.isActive=true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 标题点击事件 子组件传递的
  handleTabsItemChange (e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求  type=1 index = 0
    this.getOrders(index+1)
  },
  onShow () {
    // 判断缓存中是否有token
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({url: '/pages/auth/index'})
      return
    }
    // 1.获取当前小程序的页面栈(内存中的数组，长度最大是10个页面，如果打开15个页面，从第15个页面点返回，当返回到第5页时就无法继续返回了，因为5之前的页面被释放了)
    // 每打开一个新页面就会在小程序的页面栈中添加一个当前页面
    let pages = getCurrentPages()
    // 2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length-1]
    const {type} = currentPage.options
    // 激活选中页面标题
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
    
  },
  // 获取订单列表
  getOrders (type) {
    request({url: '/my/orders/all', data: {type}}).then(res => {
      console.log(res);
    })
  }
})