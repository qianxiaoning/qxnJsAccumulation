//laydate
function layDate(a,b) {
    layui.use('laydate',function(){
        var laydate = top.layui.laydate;
        var start = {
            format: 'YYYY-MM-DD hh:mm:ss',
            min: '1970-01-01 23:59:59',
            max: '2099-06-16 23:59:59', // 设定最大日期
            istime: true,
            istoday: false,
            choose: function (datas) {
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas; //将结束日的初始值设定为开始日
            }
        };
        var end = {
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(),
            max: '2099-06-16 23:59:59', // 设定最大日期
            istime: true,
            istoday: false,
            choose: function (datas) {
                start.max = datas; //结束日选好后，重置开始日的最大日期
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
//  左侧树
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
        //回调函数
        callback: {
            //点击的事件回调函数
            onClick : onClick,
            onCheck : onCheck
        }
    };
    doAjax(url,'get',data,suc);
    function suc(res) {
            //data赋给全局变量
            dataObj = res;
            zTreeObj = $.fn.zTree.init(top.$(id), setting, res);
            //zTreeObj.getNodes 获取 zTree 的全部节点数据
            var nodes = zTreeObj.getNodes();
            zTreeObj.expandNode(nodes[0], true, false, true);
    }
}

//初始化表格
function tables(id, url,method,sidePagination,columns) {
    $(id).bootstrapTable({
            url: url,         //请求后台的URL（*）
            method: method,                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,
            pagination: true,                   //是否显示分页（*）
            paginationHAlign: "left",
            paginationDetailHAlign: "right",
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                        //每页的记录行数（*）
            pageList: [10, 25, 50, 100],         //可供选择的每页的行数（*）
            smartDisplay: false,
            clickToSelect: true,                //是否启用点击选中行
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            sidePagination: sidePagination,
            queryParamsType:'limit',
            queryParams:function (params) {
                return params;
            },
            sortable: true,
            showRefresh: false,
            showPaginationSwitch: false,
            cardView: false,                    //是否显示详细视图
            singleSelect: true,                   //禁止多选
            paginationLoop: false,                   //设置为 true 启用分页条无限循环的功能
            columns: columns,
            // onLoadSuccess: function(){  //加载成功时执行
            //     top.layer.msg("加载成功");
            // },
            onLoadError: function(){  //加载失败时执行
                top.layer.msg("加载数据失败", {time : 1500, icon : 2});
            }
        }
    );
}

//  layer弹出框
function layers(title, area, content, suc, yes) {
    top.layer.open({
        type: 1,
        title: title,  // 弹出框的标题
        btn: ['确定', '取消'],
        area: area,
        offset: ['6%'],
        resize: false,
        move: false,
        shadeClose: true,//是否点击遮罩关闭
        content: content, // 弹出框的内容
        success: suc,  // 层弹出后的成功毁掉的方法
        yes: yes  // 确定按钮的回调方法
    });
}

//ajax传送参数
function doAjax(url,type,data,sucfn,beforeSend) {
    $.ajax({
        url: url,
        type: type,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        //正式data
        // data:　JSON.stringify(data),
        //调试data
        data:data,
        //用传统的方式来序列化数据 比如传数组时
        // traditional:true,
        error: function () {
            top.layer.msg('操作失败');
        },
        // success: function (res) {
        //     if(res.status){
        //         sucfn();
        //     }
        //     else{
        //         top.layer.msg('操作失败');
        //     }
        // }
        //测试用
        success: sucfn,
	beforeSend:beforeSend
    })
}

//正则
//只判断为空
top.$.fn.isEmpty = function(){
    $(this).blur(function(){
        if($(this).val()==''){
            $(this).siblings().remove();
            $(this).after("<p style='color:red'>内容不能为空</p>");
            $(this).val('');
        }
        else{
            $(this).siblings().remove();
        }
    });
};

//qrcode
top.$(".qrc01").qrcode({
                render: "canvas", //table方式
                width: 100, //宽度
                height:100, //高度
                text: "www.baidu.apk" //任意内容
            });
            top.$(".qrc02").qrcode({
                render: "canvas", //table方式
                width: 100, //宽度
                height:100, //高度
                text: "135465456" //任意内容
            });
            //canvas转图片
            function convertCanvasToImage(canvas) {
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                $(canvas).replaceWith($(image));
            }
            convertCanvasToImage(top.$(".qrc01 canvas")[0]);
            convertCanvasToImage(top.$(".qrc02 canvas")[0]);