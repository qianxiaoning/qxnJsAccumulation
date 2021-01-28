//多张图片上传
//多张图片全局数组
var multi01 = [], multi02 = [], multi03 = [], multi04 = [];
function multiUpload(a) {
    var d = '.picInfo_subLiMulti .up';    
    $(d).find('.dn').change(function () {
        //重点：input文件选择为空时不执行
        if ($(this).val() != '') {
            var that = this;
            if (this.files && this.files[0]) {
                var i = 0;
                inner(i);
                function inner(i) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        //第一张图片赋值                            
                        if (i == 0 && $(that).parent().siblings('img').attr('src') == '') {
                            $(that).parent().siblings('img').attr('src', evt.target.result);
                        }
                        //重点：利用eval函数把字符串转为我需要的数组变量
                        eval($(that).attr('id')).push(evt.target.result);
                        //重点：根据条件递归
                        if (i < that.files.length - 1) {
                            i++;
                            //重点：调自己
                            inner(i);
                        }
                        else {
                            //i加超length时执行 可重复上传
                            $(that).val('');
                            //赋标题数字
                            var initT = $(that).parent().parent().siblings().text();
                            if (initT.indexOf('（') >= 0) {
                                initT = initT.substring(0, initT.indexOf('（'));
                            }
                            $(that).parent().parent().siblings('.down1').text(initT + '（' + eval($(that).attr('id')).length + '）');
                        }
                    };
                    reader.readAsDataURL(that.files[i]);
                }                
            }
        }
    })            
}