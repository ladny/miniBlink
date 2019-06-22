const chars=['0','1','2','3','4','5','6','7','8','9']

//随机字符串 
const random=function generateMixed(n){
    var res='';
    for(var i=0;i<n;i++){
        var id=Math.ceil(Math.random()*35);
        res+=chars[id]
    }
    return res;
 }

 export {random}