//��ӡ����
    //printBtn
    var printBtn0 = $(".lineChart .allPrint")[0];
    printBtn0.onclick = function () {
        //��һ��echarts canvas���ɵ�ͼ
        var img0 = myChart.getImage();
        //�½�һ������
        var picWin0 = window.open();
        //��ȡ�´��ڵ�document����
        var d = $(picWin0).attr("document");
        //��ȡ�´��ڵ�body
        var b = $(d).find("body");
        //�´���body����ʽ
        b.css({"text-align": "center"});
        //�������ɵ�ͼ
        b.append(img0);
        //����jquery�Ķ��������еĻص�����������ͼƬ�������ִ�д�ӡ�´���ҳ��
        $(img0).animate({left: '1px'}, function () {
            picWin0.print()
        });
    };