//nav li -active
function nav_li_active() {
    var li = $(".header .menu .sub");
    li.each(function () {
        //�жϱ���href
        if (($(this).attr("href") == window.location.pathname)) {
            $(this).addClass('sel');
        }
        //�����.drop����ӽڵ�
        if ($(this).children().eq(1).attr("class") == 'drop') {
            var lis = $(this).find(".inner");
            //����drop���inner
            lis.each(function () {
                //�����inner��href����window.location
                if (($(this).attr("href") == window.location.pathname)) {
                    //����������ȼ�.sub����.sel״̬
                    $(this).parents(".sub").addClass('sel');
                }
            })
        }
    });
}