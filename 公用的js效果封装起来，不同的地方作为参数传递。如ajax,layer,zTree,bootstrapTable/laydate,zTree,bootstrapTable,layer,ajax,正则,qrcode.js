//laydate
function layDate(a,b) {
    layui.use('laydate',function(){
        var laydate = top.layui.laydate;
        var start = {
            format: 'YYYY-MM-DD hh:mm:ss',
            min: '1970-01-01 23:59:59',
            max: '2099-06-16 23:59:59', // �趨�������
            istime: true,
            istoday: false,
            choose: function (datas) {
                end.min = datas; //��ʼ��ѡ�ú����ý����յ���С����
                end.start = datas; //�������յĳ�ʼֵ�趨Ϊ��ʼ��
            }
        };
        var end = {
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(),
            max: '2099-06-16 23:59:59', // �趨�������
            istime: true,
            istoday: false,
            choose: function (datas) {
                start.max = datas; //������ѡ�ú����ÿ�ʼ�յ��������
            }
        };
        top.$(a).click(function(){
            start.elem = this;
            laydate(start);
        });
        top.$(b).click(function(){
            end.elem = this;
            laydate(end);
        });
    });
}

var zTreeObj;
var dataObj;
var setting;
//  �����
function getZtree(id,flag,onClick,onCheck,url,data){
    setting = {
        edit : {
            enable: false,
            editNameSelectAll: true
        },
        data: {
            simpleData: {
                enable:true,
                idKey: "id",
                pIdKey: "pId",
                system:"system",
                rootPId: ""
            }
        },
        check: {
            enable: flag
        },
        //�ص�����
        callback: {
            //������¼��ص�����
            onClick : onClick,
            onCheck : onCheck
        }
    };
    doAjax(url,'get',data,suc);
    function suc(res) {
            //data����ȫ�ֱ���
            dataObj = res;
            zTreeObj = $.fn.zTree.init(top.$(id), setting, res);
            //zTreeObj.getNodes ��ȡ zTree ��ȫ���ڵ�����
            var nodes = zTreeObj.getNodes();
            zTreeObj.expandNode(nodes[0], true, false, true);
    }
}

//��ʼ�����
function tables(id, url,method,sidePagination,columns) {
    $(id).bootstrapTable({
            url: url,         //�����̨��URL��*��
            method: method,                      //����ʽ��*��
            striped: true,                      //�Ƿ���ʾ�м��ɫ
            cache: false,
            pagination: true,                   //�Ƿ���ʾ��ҳ��*��
            paginationHAlign: "left",
            paginationDetailHAlign: "right",
            pageNumber: 1,                       //��ʼ�����ص�һҳ��Ĭ�ϵ�һҳ
            pageSize: 10,                        //ÿҳ�ļ�¼������*��
            pageList: [10, 25, 50, 100],         //�ɹ�ѡ���ÿҳ��������*��
            smartDisplay: false,
            clickToSelect: true,                //�Ƿ����õ��ѡ����
            uniqueId: "id",                     //ÿһ�е�Ψһ��ʶ��һ��Ϊ������
            sidePagination: sidePagination,
            queryParamsType:'limit',
            queryParams:function (params) {
                return params;
            },
            sortable: true,
            showRefresh: false,
            showPaginationSwitch: false,
            cardView: false,                    //�Ƿ���ʾ��ϸ��ͼ
            singleSelect: true,                   //��ֹ��ѡ
            paginationLoop: false,                   //����Ϊ true ���÷�ҳ������ѭ���Ĺ���
            columns: columns,
            // onLoadSuccess: function(){  //���سɹ�ʱִ��
            //     top.layer.msg("���سɹ�");
            // },
            onLoadError: function(){  //����ʧ��ʱִ��
                top.layer.msg("��������ʧ��", {time : 1500, icon : 2});
            }
        }
    );
}

//  layer������
function layers(title, area, content, suc, yes) {
    top.layer.open({
        type: 1,
        title: title,  // ������ı���
        btn: ['ȷ��', 'ȡ��'],
        area: area,
        offset: ['6%'],
        resize: false,
        move: false,
        shadeClose: true,//�Ƿ������ֹر�
        content: content, // �����������
        success: suc,  // �㵯����ĳɹ��ٵ��ķ���
        yes: yes  // ȷ����ť�Ļص�����
    });
}

//ajax���Ͳ���
function doAjax(url,type,data,sucfn,beforeSend) {
    $.ajax({
        url: url,
        type: type,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        //��ʽdata
        // data:��JSON.stringify(data),
        //����data
        data:data,
        //�ô�ͳ�ķ�ʽ�����л����� ���紫����ʱ
        // traditional:true,
        error: function () {
            top.layer.msg('����ʧ��');
        },
        // success: function (res) {
        //     if(res.status){
        //         sucfn();
        //     }
        //     else{
        //         top.layer.msg('����ʧ��');
        //     }
        // }
        //������
        success: sucfn,
	beforeSend:beforeSend
    })
}

//����
//ֻ�ж�Ϊ��
top.$.fn.isEmpty = function(){
    $(this).blur(function(){
        if($(this).val()==''){
            $(this).siblings().remove();
            $(this).after("<p style='color:red'>���ݲ���Ϊ��</p>");
            $(this).val('');
        }
        else{
            $(this).siblings().remove();
        }
    });
};

//qrcode
top.$(".qrc01").qrcode({
                render: "canvas", //table��ʽ
                width: 100, //���
                height:100, //�߶�
                text: "www.baidu.apk" //��������
            });
            top.$(".qrc02").qrcode({
                render: "canvas", //table��ʽ
                width: 100, //���
                height:100, //�߶�
                text: "135465456" //��������
            });
            //canvasתͼƬ
            function convertCanvasToImage(canvas) {
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                $(canvas).replaceWith($(image));
            }
            convertCanvasToImage(top.$(".qrc01 canvas")[0]);
            convertCanvasToImage(top.$(".qrc02 canvas")[0]);