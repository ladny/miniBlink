// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number,
    },
    readOnly:{
      type:Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    //数据绑定
    //三元表达式
    //封装内部，开放出来
    //粒度 如何封装组件
    yesSrc:'../images/like.png',
    noSrc:'../images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event) {
      //自定义事件
      if(this.properties.readOnly){
        return
      }
      let like= this.properties.like
      let count=this.properties.count
      count=like? count-1 : count+1
      this.setData({
        count:count,
        like:!like
      })

      //激活
      let behavior=this.properties.like ? "like" : "cancel"
      //triggerEvent这个函数用来激活事件
      //参数一、自定义事件的名称,参数二，是js对象传递自己定义的参数,参数三默认不填
      this.triggerEvent('like',{
        behavior:behavior
      },{})

    }

  }
})
