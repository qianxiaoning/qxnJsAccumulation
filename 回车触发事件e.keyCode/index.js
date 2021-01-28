//左侧树搜索框回车搜索功能
function enterSearch1() {
    var btn = $('#searchstr');
    btn.keydown(function (e) {
        var e = e || window.event;
        if (e.keyCode == 13) {
            mySearch(this);
        }
    })
}