// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  //开启插槽
  options:{
    multipleSlots:true
  },
  //自定义属性 在页面中驼峰属性要改成连字符的形式open-type
  properties: {
    openType:{
      type:String
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
    onGetUserInfo(event){
      this.triggerEvent('getuserinfo',event.detail,{})
    }
  }
})
