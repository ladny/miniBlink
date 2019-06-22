import {HTTP} from '../util/http.js'

export class LikeModel extends HTTP {
    like(behavior,artID,category){
        //动态获取点赞、取消接口 
        let url=behavior=='like' ? 'like' : 'like/cancel'
        this.request({
            url:url,
            method:'post',
            data:{
                art_id:artID,
                type:category
            }
        })
    }

    //获取点赞信息
    getClassicLikeStatus(artID,category,sCallback){
        this.request({
            url:'classic/'+category+'/'+artID+'/favor',
            success:sCallback
        })
    }
}