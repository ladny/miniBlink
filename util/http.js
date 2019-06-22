import {config} from '../config.js'

const tips={
    1:'抱歉，出现了一个错误',
    1005:'不正确的开发者key',
    3000:'该期内容不存在'
}
//类
export class HTTP{
    //方法
    request(params){
        // url,data,method,
        if(!params.method){
            params.method='GET'
        }
        wx.request({
            url:config.api_base_url+params.url,
            method:params.method,
            data:params.data,
            header:{
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success:(res)=>{
                //4XX的错误还是会在这里
                //startsWith以‘’开头
                //endsWith以‘’结尾
                let code=res.statusCode.toString()
                if(code.startsWith('2')){
                    //调用params的回调函数success，把res传递进来
                    params.success && params.success(res.data)
                }else{
                    //服务器异常
                    let error_code=res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail:(err)=>{
                //api调用失败
                this._show_error(1)
            }
        })
    }

    _show_error(error_code){
        if(!error_code){
            error_code=1
        }
        const tip=tips[error_code]
        wx.showToast({
            title:tip?tip:tips[1],
            icon:'none',
            duration:2000
        })

    }
}
