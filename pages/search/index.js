import { request } from '../../request/index'
Page({
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputValue: ''
  },
  TimeId: -1,
  // 输入框的值改变时触发
  handleInput (e) {
    clearTimeout(this.TimeId)
    const {value} = e.detail
    // trim 去除字符串中的空格
    // 如果为空 直接 return
    if (!value.trim()) {
       this.setData({
         goods: [],
         isFocus: false
       })
      return
    }
    this.setData({
      isFocus: true
    })
    // 如果值不为空 发送请求
    // 1s后发送请求
    this.TimeId = setTimeout(() => {
      request({url: '/goods/qsearch', data: {query: value}}).then(res => {
        this.setData({
          goods: res.data.message
        })
      })
    }, 1000)
  },
  // 点击取消按钮
  handleCancel (e) {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    })
  }
})