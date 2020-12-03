Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow () {
    // 获取缓存中的地址数据
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart')||[]
    this.setData({
      address
    })
   this.setCart(cart)
  },
  // 点击收货地址触发事件
  handleChooseAddress () {
    // 获取收货地址
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        wx.chooseAddress({
          success: (res) => {
            wx.setStorageSync('address', res)
            
          }
        })
      }
    })
  },
  // 商品选中
  handleItemChange (e) {
    const goods_id = e.currentTarget.dataset.id
    console.log(e);
    let {cart} = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    console.log(index);
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态 重新计算底部工具栏数据
  setCart (cart) {
    let allChecked = true
    // 总数量 总价格
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked: false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  // 商品的全选功能
  handleItemCheck () {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  // 商品数量编辑功能
  handleItemNumEdit (e) {
    const {operation, id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    // 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品？',
        success: (res)=> {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  // 结算
  handlePay () {
    // 判断收货地址
    const {address, totalNum} = this.data
    if (!address.userName) {
      wx.showToast({
        title: '您的收货地址还没有添加',
        icon: 'none',
      })
      return
    }
    // 判断用户有没有选购商品
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none'
      })
      return
    }
    // 否则 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})