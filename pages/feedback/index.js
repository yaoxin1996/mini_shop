// pages/feedback/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      }, {
        id: 1,
        value: '商品/商家投诉',
        isActive: false
      }
    ],
    // 被选中的图片路径 数组
    chooseImgs: [],
    // 文本域内容
    textVal: ''
  },
  // 外网图片路径数组
  UpLoadImgs: [],
  // 标题点击事件 子组件传递的
  handleTabsItemChange (e) {
    const {index} = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i===index ? v.isActive=true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 点击加号选择图片
  handleChooseImg () {
    wx.chooseImage({
      // 同时选中的图片数量
      count: 9,
      // 图片格式  原图         压缩
      sizeType: ['original','compressed'],
      // 来源        相册     相机
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          // 图片数组拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击自定义图片组件
  handleRemoveImg (e) {
    const {img} = e.detail
    let {chooseImgs} = this.data
    chooseImgs.forEach((v, i) => {
      if (v == img) {
        chooseImgs.splice(i, 1)
      }
    })
    this.setData({chooseImgs})
  },
  // 预览图片
  handleShowImg (e) {
    const {index} = e.currentTarget.dataset
    wx.previewImage({
      current: this.data.chooseImgs[index], // 当前显示图片的http链接
      urls: this.data.chooseImgs
    })
  },
  // 文本域输入事件 
  handleTextInput (e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 
  handleFormSubmit (e) {
    const {textVal, chooseImgs} = this.data

    // 判断输入内容是否为空
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      })
      // 不合法
      return
    }
    // 显示正在等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })

    // 判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      // 上传文件的api不支持多个文件同时上传(遍历 上传)
      chooseImgs.forEach((v, i) => {
        // 上传图片到服务器
        wx.uploadFile({
          url: 'https://iimg.com.cn/api/upload',
          filePath: v,
          name: "file",
          formData: {},
          success: (result)=>{
            let url = JSON.parse(result.data).url
            this.UpLoadImgs.push(url)
            // 所有图片都上传成功后 触发
            if (i == this.UpLoadImgs.length - 1) {
              wx.hideLoading();
              // 把文本内容和外网图片地址 提交到后台
              // 提交成功后 
              // 重置页面
              this.setData({
                chooseImgs: [],
                textVal: ''
              })
              // 返回上一页面
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      })
    } else {
      // 只提交文本
    }

  }
})