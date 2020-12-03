import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    // 商品是否被收藏过
    isCollect: false
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)

    


  },
  // 获取商品详情数据
  getGoodsDetail (goods_id) {
    request({url: '/goods/detail', data: {goods_id}}).then(res => {
      const goodsObj = res.data.message
      this.GoodsInfo = goodsObj
      // 获取缓存中的商品收藏数组
      let collect = wx.getStorageSync('collect') || []
      // 判断商品是否被收藏
      let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
      this.setData({
        goodsObj: {
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          // iPhone部分手机不识别 webp格式图片
          // 临时修改 确保后台存在 1.webp => 1.jpg
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsObj.pics
        },
        isCollect
      })
    })
  },
  // 点击轮播图放大预览
  handlePrevewImage (e) {
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 点击加入购物车
  handleCartAdd () {
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[]
    // 判断商品是否存在于购物车数组中
    // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置
    // findIndex() 方法为数组中的每个元素都调用一次函数执行：
    // 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
    // 如果没有符合条件的元素返回 -1
    // findIndex() 对于空数组，函数是不会执行的,没有改变数组的原始值
    let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在 等待添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 已存在 执行num++
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  // 收藏商品
  handleCollect () {
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    // 判断是否收藏过 如果没有符合条件的  返回 undefined
    let index = collect.find(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index !== undefined) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({isCollect})
  }
})