const { request } = require("../../request/index")

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow () {
    // 获取缓存中的地址数据
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart')||[]
    // 过滤后的购物车数据（只需要 checked = true 的商品数据）
    cart = cart.filter(v => v.checked)
   
    // 总数量 总价格
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  // 支付
  handleOrderPay () {
    // 先判断有没有token 
    const token = wx.getStorageSync('token')
    // 没有 直接跳转到授权页面
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return
    }
    console.log('已存在');
    // 创建订单 （请求接口）
    const header = {Authorization: token}
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address
    let goods = []
    this.data.cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_num: v.number,
      goods_price: v.goods_price
    }))
    const params = {order_price, consignee_addr, goods}
    request({url: '/orders/create', method: 'POST', data: params, header}).then(res => {
      console.log(res);
      // 得到订单信息及编号
    })
  }
})