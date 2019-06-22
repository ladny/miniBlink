//分页加载
const paginationBev=Behavior({
    data:{
        dataArray:[],
        total:null,
        noneResult:false,
        loading:false//是否正在发送请求 锁
    },
    methods:{
        setMoreData(dataArray){
            const tempArray=this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray:tempArray
            })

        },
        //当前起始数
        getCurrentStart(){
            return this.data.dataArray.length
        },
        setTotal(total){
            this.data.total=total
            if(total==0){
                this.setData({
                    noneResult:true
                })
            }
        },
        //是否还有数据返回
        hasMore(){
            if(this.data.dataArray.length>=this.data.total){
                return false
            }else{
                return true 
            }  
        },
        //重置
        initialize(){
            this.setData({
                dataArray:[] ,
                noneResult:false,
                loading:false
            })         
            // this.data.dataArray=[]
            this.data.total=null
        },
        //表示锁状态 是否锁住
        isLocked(){
            return this.data.loading?true:false
        },
        locked(){
            this.setData({
            loading:true
            })
        },   
        unLocked(){
            this.setData({
            loading:false
            })
        },
    }
})

export {paginationBev}