// pages/mine/index.js
import {ClassicModel} from '../../models/classic.js'
import {BookModel} from '../../models/book.js'

const classicModel=new ClassicModel()
const bookModel=new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,//切换头像的变量
    userInfo:null,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户是否授权
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()

    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
  
  },

  //注意需要传回调函数 因为不是promise执行的接口请求
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classics:res
      })
    })
  },

  getMyBookCount(){
    bookModel.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount:res.count
      })
    })

  },
  //判断用户是否已经授权过
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
              success:data=>{
                this.setData({
                  authorized:true,
                  userInfo:data.userInfo
                })
              }
            })
        }else{
          console.log("err")
        }
      }
    })

  },
  onGetUserInfo(event){
    const userInfo=event.detail.userInfo;
    if(userInfo){
      this.setData({
        userInfo,
        authorized:true
      })
    }
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url:'/pages/about/index'
    })

  },

  onStudy(event){
    wx.navigateTo({
      url:'/pages/course/index'
    })
  }


})