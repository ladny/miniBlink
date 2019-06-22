// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },

// 外部样式 自定义变量名
  externalClasses:[
    'tag-class'

  ],

  properties: {
    text:String
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
    //创建一个自定义事件，把文本传递出去
    onTap(event){
      //页面监听这个事件名tapping
      this.triggerEvent('tapping',{
        text:this.properties.text
      })

    }

  }
})
