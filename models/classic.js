import {HTTP} from '../util/http.js'
export class ClassicModel extends HTTP{
    getLatest(sCallback){
        //通过继承的不需要实例化，直接用this
        this.request({
            url:'classic/latest',
            success:(res)=>{
              //把结果回传回去
              sCallback(res)
              //保存最新期刊号写入缓存
              this._setLatestIndex(res.index)
              //因为index未知，所以不能先读缓存，只能先请求再存入缓存
              let key=this._getKey(res.index)
              wx.setStorageSync(key,res)
            }
          })
    }

    getClassic(index,nextOrPrevious,sCallback){
        //缓存中寻找 or API写入到缓存中
        //key 确定key 私有方法保存key
        let key= nextOrPrevious=='next' ? 
        this._getKey(index+1) : this._getKey(index-1)
        //从缓存中获取classic
        let classic=wx.getStorageSync(key)
        if(!classic){
            //如果缓存中没有则去服务器请求
            this.request({
                url:`classic/${index}/${nextOrPrevious}`,
                success:(res)=>{
                    //写入缓存
                    wx.setStorageSync(
                        this._getKey(res.index),res)
                    sCallback(res)
                }
            })
        }else{
            sCallback(classic)
        }
       
    }

    isFirst(index){
        return index==1 ? true : false
    }

    isLatest(index){
       let latestIndex=this._getLatestIndex()
       return latestIndex==index ? true :false
    }

    getMyFavor(success){
        const params={
            url:'classic/favor',
            success:success
        }
        this.request(params)
    }

    //最新期刊的期号,同步写入缓存
    _setLatestIndex(index){
        wx.setStorageSync('latest',index)
    }

    //读取缓存
    _getLatestIndex(){
        let index=wx.getStorageSync('latest')
        return index
    }

    _getKey(index){
        let key='classic-'+index
        return key
    }



}