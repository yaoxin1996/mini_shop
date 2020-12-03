// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeImg (e) {
      console.log(e);
      const img = e.currentTarget.dataset.index
      this.triggerEvent('removeImgItem', {img})
    },
  }
})
