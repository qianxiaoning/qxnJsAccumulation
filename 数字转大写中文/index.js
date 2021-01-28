//大写金额
function word(n){
    var num = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
    var digit = ['','拾','佰','仟','万'];
    var b=n.toString();
    var sLength = b.length;
    //返回每一位上的数
    function perNo(s){
        return b.split('');
    }
    //循环位数
    var res='';
    var sLength1=sLength;
    for(var i=0;i<sLength;i++){
        //亿
        if(sLength1>8&&sLength1<=12){
            sLength1--;
            res += num[perNo(b)[i]]+digit[sLength1-8];
            if(sLength1==8){
                res += '亿';
            }
        }
        //万
        if(sLength1>5&&sLength1<=8){
            sLength1--;
            res += num[perNo(b)[i]]+digit[sLength1-4];
        }
        if(sLength1>0&&sLength1<=5){
            sLength1--;
            res += num[perNo(b)[i]]+digit[sLength1];
        }
    }
    return res+'元';
}