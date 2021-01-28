//input图片转base64
//input内容change时触发
$('input').change(function () {
    //提交为空时不执行
    if ($(this).val() != '') {
        var that = this;
        //如果this.files对象存在 说明是高级浏览器
        if (this.files && this.files[0]) {
            //console.log(this.files[0]);
            //this.files[0].name为文件名
            var fileType = this.files[0].name.substr(-3, 3);
            //fileType是文件后缀
            //如果是pdf
            if (fileType == 'pdf') {

            }
            //如果非pdf
            else {
                //创建一个FileReader对象
                var reader = new FileReader();
                //对象加载完毕时
                reader.onload = function (evt) {
                    //console.log(evt.target.result);                    
                    //获得evt.target.result即图片的base64码
                    $(that).parent().siblings('img').attr('src', evt.target.result);
                };
                //readAsDataURL以base64的形式读文件
                reader.readAsDataURL(this.files[0]);
            }
        }
        //this.files对象不存在 即ie的兼容    
        else {
            //直接this.value获得路径图片赋值
            $(that).parent().siblings('img').attr('src', this.value);
        }
    }
})
//----------------------------------------
//图片左右切换原理
click(){
    //如果bigLi前面还有元素
    if (bigLi.prev().length == 1) {
        //把bigLi前一个图片赋到pop里
        $('popImg').attr('src', bigLi.prev().children('img').attr('src'));
        //赋完前一个bigLi为当前bigLi
        bigLi = bigLi.prev();
    }
}   
//----------------------------------------
//ajax FormData传文件
var fd = new FormData();
//.append添加字段
fd.append("upload", 1);
//添加input file的files对象
fd.append("upfile", that.files[0]);
$.ajax({
   url: "",
   type: "post",
   processData: false,// 告诉jQuery不要去处理发送的数据
   contentType: false,// 告诉jQuery不要去设置Content-Type请求头
   //data传入FormData对象
   data: fd,
   success: function (res) {
       console.log(res);       
   });
});