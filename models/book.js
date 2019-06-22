import {
    HTTP
} from '../util/http-p.js'

export class BookModel extends HTTP {
    getHostList() {
       return this.request(
           {
               url:'book/hot_list'
            //    data:{
            //     name:'123',
            //     age:12
            //    },
            //    method:'POST'
               
           })
        //    '/book/hot_list',{
        //        name:'123',
        //        age:12
        //    },'post')
    }

    getMyBookCount(){
        return this.request({
            url:'book/favor/count'
        })
    }

    //搜索书籍 summary:1是书籍简介 0是完整介绍
    search(start,q){
        return this.request({
            url:'book/search',
            data:{
                q:q,
                start:start,
                summary:1
            }
        })
    }

    getDetail(bid){
        return this.request({
            url:`book/${bid}/detail`
        })
    }

    getLikeStatus(bid){
        return this.request({
            url:`book/${bid}/favor`
        })
    }

    getComments(bid){
        return this.request({
            url:`book/${bid}/short_comment`
        })
    }

    postComment(bid,comment){
        return this.request({
            url:'book/add/short_comment',
            method:'POST',
            data:{
                book_id:bid,
                content:comment
            }
        })
    }


} 