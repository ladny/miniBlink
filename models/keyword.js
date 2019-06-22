 import {HTTP} from '../util/http-p.js'


 //继承HTTP
 class KeywordModel extends HTTP{
    key="q"
    maxLength=10
    //先存入缓存
    getHistory(){
        const words=wx.getStorageSync(this.key)
        if(!words){
            return []
        }
        return words
    }

    getHot(){
        return this.request({
            url:'/book/hot_keyword'
        })
    }

    //写入缓存
    addToHistory(keyword){
        //历史关键字的数组 
        let words=this.getHistory()
        console.log(words)
        //是否包含关键字
        const has=words.includes(keyword)
        //如果历史数据中没有这个关键字keyword 则加入到words数组的第一个位置
        //数据结构 队列
        if(!has){
            //数组末尾的删除掉，再将关键字插入到第一位
            const length=words.length
            if(length>=this.maxLength){
                words.pop()
            }
            words.unshift(keyword)
            //存储到缓存中
            wx.setStorageSync(this.key,words)
        }
    }
}

export {KeywordModel}