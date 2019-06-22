// components/search/index.js
import {BookModel} from '../../models/book.js'
import {KeywordModel} from '../../models/keyword.js'
import {paginationBev} from '../../components/behaviors/pagination.js'
const bookModel=new BookModel()
const keywordModel=new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    // historyWords:Array,
    // hotWords:Array,
    // dataArray:Array,
    // q:String,//赋值输入框的文本
    more:{
      type:String,
      observer:'load_more' //observer监听属性改变时执行函数
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray:[],
    searching:false, //控制显示隐藏
    q:'',
    loadingCenter:false //加载中的图标
   
  },

  //初始化组件时调用的初始化函数
  attached(){
    console.log()
    //historyWords返回的是数组
    //hotEords返回的是promise

    //进行数据绑定
    this.setData({
      historyWords:keywordModel.getHistory()
    })
    //在回调函数中setData
    keywordModel.getHot()
    .then(res=>{
      console.log(res);
      this.setData({
        hotWords:res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //每次触底时触发函数
    load_more(){
      console.log("_load_more")
      if(!this.data.q){
        return
      }
      //重复加载的问题
      //同时向服务器发生两个请求 要求一次只能发送一个请求
      //---锁
      //服务器无数据时，发送无效请求的问题
      //当前已经存在的数据
      if(this.isLocked()){
        return
      }
      if(this.hasMore()){
        // const length=this.data.dataArray.length
        this.locked() //锁住
        bookModel.search(this.getCurrentStart(),this.data.q)
        .then(res=>{
        // const tempArray=this.data.dataArray.concat(res.books)
        // this.setData({
        //   dataArray:tempArray
        // })
        this.setMoreData(res.books)
        this.unLocked() //解锁
      },()=>{
        this.unLocked() //解锁
      })
      //死锁
      }
    },
   
    onConfirm(event){
      this._showResult()
      this._showLoadingCenter()
      //event.detail.value是文本框中输入的文本
      //event.detail.text是tag自定义事件携带有标签的文本
      const q=event.detail.value || event.detail.text
      this.setData({
        q:q
      })
      bookModel.search(0,q)
      .then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
      // this.triggerEvent('confirm',q)
    },
    onCancel(event){
      //重置 
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },
    onDelete(event){
      //重置 
      this.initialize()
      this._closeResult()
    },
    //显示中间加载中的图标
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    //隐藏中间加载中的图标
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _showResult(){
      this.setData({
        searching:true
      })
    },
    _closeResult(){
      this.setData({
        searching:false,
        q:''
      })
    }
  

  }
})
