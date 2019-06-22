// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      observer:function(newVal,oldVal,changePath){
        //newVal 就是新设置的数据， oldVal 是旧数据
        let val=newVal<10 ? '0'+newVal : newVal
        console.log(val)
        //注意在data中添加一个参数
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year:0,
    month:'',
    _index:''
  },

  //页面加载组件时执行
  attached:function(){
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()
    this.setData({
      year:year,
      month:this.data.months[month]
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
