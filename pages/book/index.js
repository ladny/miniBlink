// pages/book/index.js
import {BookModel} from '../../models/book.js'
// import {KeywordModel} from '../../models/keyword.js'
import{ random} from '../../util/common.js'
const bookModel=new BookModel()
// const keywordModel=new KeywordModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more:'',
    // historyWords:[],
    // hotWords:[],
    // dataArray:[],
    // q:'',
    // loading:false //是否正在发送请求 锁
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //promise对象 对象保存状态
    //参数是一个函数，函数又可以接收两个参数
    //第一步 promise new一个对象
    //第二步 异步代码 写在promise的函数中
    //promise的三种状态 pending fulfilled rejected 
    //进行中 已成功 已失败
    //new promise就是进行中 resolve是把进行中变成已成功  reject把进行中变成已失败 一旦修改后就凝固状态了
    // const promise = new Promise((resolve, reject) => {
    //   //获取系统信息 异步的
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: err => reject(err)
    //   })
    // })
    // //第三步 通过then方法 来调用
    // //then需要传递两个回调函数,顺序不能颠倒
    // promise.then(
    //   res => console.log(res),
    //   err => console.log(err)
    // )

    bookModel.getHostList()
      .then(res=>{
        //注意赋值时使用setData
        this.setData({
          books:res
        })
      })

      // this.setData({
      //   historyWords:keywordModel.getHistory()
      // })
    
      // //在回调函数中setData
      // keywordModel.getHot()
      // .then(res=>{
      //   console.log(res);
      //   this.setData({
      //     hotWords:res.hot
      //   })
    
      // })
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    })
  },

  //定义父页面
  onConfirm(e){
    //注意此处是子组件传递过来的值用e.detail获取到
    // const q=e.detail
    // console.log("父page"+q)
    // bookModel.search(0,q).then(res=>{
    //   this.setData({
    //     dataArray:res.books,
    //     q:q
    //   })
    //   keywordModel.addToHistory(q)
    // })
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //可以向组件发一个通知 告诉组件已经触底了 more属性告诉组件触底了
    console.log(123123)
      this.setData({
        more:random(6)
      })
  }
})