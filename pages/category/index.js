import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容滚动条距顶部距离
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],
  onLoad: function (options) {
    // 先判断本地存储中有没有旧的数据
    // {time: Date.now(), data: [...]}
    // 没有旧数据，直接发送请求
    // 有旧数据，且没有过期，就使用本地存储中的旧数据

    // 获取本地存储中的数据 （小程序中也存在本地存储技术，且不存在类型转换操作，存什么类型获取时就是什么类型,web会先调用toString()，转为字符串,再存）
    const Cates = wx.getStorageSync('cates')
    // 判断
    if (!Cates) {
      this.getCates()
    } else {
      // 有旧数据 暂定过期时间
      if (Date.now() - Cates.time > 1000*10) {
        // 重新发送请求
        this.getCates()
      } else {
        // 使用旧数据
        this.Cates = Cates.data
        // 左侧菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    }
  },
  // 获取分类数据
  getCates () {
    request({url: '/categories'}).then(res => {
      this.Cates = res.data.message
      // 把接口中的数据存到本地存储中
      wx.setStorageSync('cates', {time: Date.now(), data: this.Cates})
      // 左侧菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap (e) {
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 scroll-view 距顶部距离
      scrollTop: 0
    })

  }
})