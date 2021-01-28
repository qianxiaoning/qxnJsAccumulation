百度编辑器
ueditor
//百度编译器 页面上
<script type="text/javascript" charset="utf-8" src="~/Content/PCNew/plugins/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="~/Content/PCNew/plugins/ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="~/Content/PCNew/plugins/ueditor/lang/zh-cn/zh-cn.js"></script>
//初始化编译器
var ue = UE.getEditor('editor');
//api
ue.ready(function () {
    ue.setContent(res.DocEntity.DocContent);
});
//扩展命令
UE.getEditor('editor').execCommand('insertHtml', text);