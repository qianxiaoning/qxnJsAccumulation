//点击document窗体触发
$(document).on('click', function (e) {
    var e = e || window.event;
    //一级菜单不消失条件
    //事件源为弹窗自身时，js原生对象相等。或者事件源的父级为弹窗自身
    var b = ($(e.target)[0] == $('.pop')[0]) || ($(e.target).parents('.pop').is($('.pop')));
    //b为true时
    if (b) {

    }
    else {
    	//弹窗消失
        $('.pop').hide();
    }
});