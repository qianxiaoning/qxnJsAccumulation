//nav li -active
function nav_li_active() {
    var li = $(".header .menu .sub");
    li.each(function () {
        //判断本身href
        if (($(this).attr("href") == window.location.pathname)) {
            $(this).addClass('sel');
        }
        //如果有.drop这个子节点
        if ($(this).children().eq(1).attr("class") == 'drop') {
            var lis = $(this).find(".inner");
            //遍历drop里的inner
            lis.each(function () {
                //如果有inner的href等于window.location
                if (($(this).attr("href") == window.location.pathname)) {
                    //则给它的祖先级.sub加上.sel状态
                    $(this).parents(".sub").addClass('sel');
                }
            })
        }
    });
}