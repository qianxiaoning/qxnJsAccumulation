//打印功能
    //printBtn
    var printBtn0 = $(".lineChart .allPrint")[0];
    printBtn0.onclick = function () {
        //第一个echarts canvas生成的图
        var img0 = myChart.getImage();
        //新建一个窗口
        var picWin0 = window.open();
        //获取新窗口的document属性
        var d = $(picWin0).attr("document");
        //获取新窗口的body
        var b = $(d).find("body");
        //新窗口body的样式
        b.css({"text-align": "center"});
        //插入生成的图
        b.append(img0);
        //利用jquery的动画方法中的回调函数，做到图片加载完就执行打印新窗口页面
        $(img0).animate({left: '1px'}, function () {
            picWin0.print()
        });
    };