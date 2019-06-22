// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'

//背景音乐播放管理
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   * 播放音乐API
   */
  data: {
    playing: false,
    pauseSrc: '../../images/player@pause.png',
    playSrc: '../../images/player@play.png'
  },


  attached(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  //在组件实例被从页面节点树移除时执行
  detached: function (event) {
    //wx:if  hidden
    // mMgr.stop()

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      //图片切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    //恢复状态
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      //当前音乐是播放音乐
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})