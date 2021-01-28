//调用
var myExample = new PicPop();
myExample.init({ s: $('.PicPopA'), id: 'PicPopA', a: PicPopASrcArray });


//定义
//详情页图片查看
//定义
//插件名
var PicPopASrcArray = [];
var PicPopBSrcArray = [];
var PicPopCSrcArray = [];
var PicPopDSrcArray = [];
var PicPop = (function ($) {    
    //私有方法	
    //私有方法里that是实例
    //_私有方法
    var _createPicArrays = function (instance) {
        for (let i = 0; i < instance.picLists.length; i++) {            
            let src = instance.a[i];
            if (typeof (src) == 'string') {
                let picObj = {};
                picObj.src = src;
                picObj.mode = _judgeModel(instance, src);
                instance.valuedPicArray.push(picObj);
            }
            else {
                let picA = [];
                for (let j = 0; j < src.length; j++) {
                    let childPicObj = {};
                    childPicObj.src = src[j];
                    childPicObj.mode = _judgeModel(instance, src[j]);
                    picA.push(childPicObj);
                }
                instance.valuedPicArray.push(picA);
            }
        }
        console.log(instance.valuedPicArray);
    };
    var _addPop = function (instance) {        
        let popHtml = "<div class='picPopPlug " + instance.id+ "'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";
        if (top.$(instance.popName).length == 0) {
            top.$('body').append(popHtml);                        
        }
    };
    //判断模式
    var _judgeModel = function (instance, src) {
        //获取图片原始尺寸
        let imageCopy = new Image();
        imageCopy.src = src;
        let imgWidth = imageCopy.width;
        let imgHeight = imageCopy.height;
        let wWidth = $(top).width();
        let wHeight = $(top).height();
        let mode = '';
        //wOrigin
        if (imgWidth > wWidth && imgHeight < wHeight) {
            mode = 'wOrigin';
        }
            //hOrigin
        else if (imgWidth < wWidth && imgHeight > wHeight) {
            mode = 'hOrigin';
        }
            //whOrigin
        else if (imgWidth > wWidth && imgHeight > wHeight) {
            mode = 'whOrigin';
        }
        else {
            mode = 'zip';
        }
        return mode;
    }
    //给popImg绑定放大事件
    var _popImgClick = function (instance, mode) {
        instance.img.attr('class', 'zip plus');
        //已放大
        $(top).off('click').click(function () {
            if (instance.openLevel == 2) {
                //给document绑定缩小事件				
                $(top.document).off('click').click(function () {

                    instance.openLevel = 1;
                    //左右及关闭控件显示
                    instance.LR.show();
                    instance.closeBtn.css({ 'opacity': '1', 'z-index': '40' });
                    //替换class
                    instance.img.attr('class', 'zip plus');
                    instance.pop.attr('class', 'picPopPlug ' + instance.id);
                    $(top.document).off('click');
                    instance.openLevel = 1;
                    //一级esc退出按钮
                    _escExit(instance);
                })
            }
                //刚进去 未放大
            else if (instance.openLevel == 1) {
                instance.img.off('click').click(function (e) {
                    //二级打开
                    instance.openLevel = 2;
                    //左右及关闭控件隐藏
                    instance.LR.hide();
                    instance.closeBtn.css({ 'opacity': '0', 'z-index': '-1' });
                    //替换class
                    instance.img.attr('class', mode + ' reduce');
                    instance.pop.attr('class', 'picPopPlug reduce ' + instance.id);
                    instance.img.off('click');
                    instance.openLevel = 2;
                    //二级esc退出按钮
                    _escExit(instance);
                })
            }
        })
    }
    //图片一级切换和判断绑定二级放大事件
    var _switchPicAndBindEnlarge = function (instance) {        
        //判断模式			
        let mode = ''
        if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) {
            mode = instance.valuedPicArray[instance.valuedPicIndex][0].mode;
        }
        else {
            mode = instance.valuedPicArray[instance.valuedPicIndex].mode;
        }
        //判断img模式 预设第二次点击			
        if (mode == 'zip') {
            //给popImg和window清空放大点击事件
            instance.img.off('click');
            $(top).off('click');
        }
        else {
            //给popImg和pop绑定事件
            _popImgClick(instance, mode);
        }
        if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) {
            instance.img.attr('src', instance.valuedPicArray[instance.valuedPicIndex][instance.childArrayIndex].src);
        }
        else {
            instance.img.attr('src', instance.valuedPicArray[instance.valuedPicIndex].src);
        }
    }
    var _openPop = function (instance) {
        //that为实例
        instance.picLists.off('click').click(function (e) {            
            //把this赋值再传入函数参数中，明确this是指什么，更语义化
            let jsDom = this;
            //第一次点击的初始化 开始
            instance.childArrayIndex = 0;
            //第一次点击赋class
            instance.img.attr('class', 'zip');
            //左右及关闭控件恢复            
            instance.LR.show();
            instance.closeBtn.css({ 'opacity': '1', 'z-index': '40' });
            instance.pop.attr('class', 'picPopPlug ' + instance.id);
            //第一次点击的初始化 结束                        
            instance.valuedPicIndex = instance.picLists.index($(jsDom));            
            //边界箭头效果与tip显示
            _borderArrowAndTipsShow(instance);
            //图片一级切换和判断绑定二级放大事件
            _switchPicAndBindEnlarge(instance);
            //淡入	
            instance.pop.fadeIn();
            //一级打开
            instance.openLevel = 1;
            //一级esc退出按钮
            _escExit(instance);
        });
    };
    //esc退出按钮
    var _escExit = function (instance) {        
        //一级打开
        if (instance.openLevel == 1) {            
            //让top层获得焦点            
            top.focus();            
            $(top.document).off('keydown').keydown(function (e) {
                var e = e || window.event;
                if (e.keyCode == 27) {                        
                    instance.pop.fadeOut();
                    instance.openLevel = 0;
                }
            });            
        }
        //二级打开
        else if (instance.openLevel == 2) {
            $(top.document).off('keydown').keydown(function (e) {
                var e = e || window.event;
                if (e.keyCode == 27) {
                    //左右及关闭控件显示
                    instance.LR.show();
                    instance.closeBtn.css({ 'opacity': '1', 'z-index': '40' });
                    //替换class
                    instance.img.attr('class', 'zip plus');
                    instance.pop.attr('class', 'picPopPlug ' + instance.id);
                    top.$('html').off('click');
                    instance.openLevel = 1;
                    //一级esc退出按钮
                    _escExit(instance);
                }
            });
        }
    };
    var _mySwitch = function (instance) {        
        //that为实例		
        instance.l.off('click').click(function () {            
            if (instance.valuedPicIndex == 0) {
                            
            }
            else {
                let l0 = instance.valuedPicArray[instance.valuedPicIndex].constructor== Object;
                let l1 = (instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) && (instance.childArrayIndex == 0);
                if (l0 || l1) {
                    instance.valuedPicIndex--;                    
                    if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Object) {

                    }
                    else if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) {
                        instance.childArrayIndex = instance.valuedPicArray[instance.valuedPicIndex].length - 1;
                    }
                }
                else {
                    instance.childArrayIndex--;
                }                
            }
            //图片一级切换和判断绑定二级放大事件
            _switchPicAndBindEnlarge(instance);
            //边界箭头效果与tip显示
            _borderArrowAndTipsShow(instance);
        });
        instance.r.off('click').click(function () {                       
            if (instance.valuedPicIndex == instance.valuedPicArray.length - 1) {                
                if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Object) {

                }                
                else if ((instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) && instance.childArrayIndex < instance.valuedPicArray[instance.valuedPicIndex].length - 1) {
                    instance.childArrayIndex++;
                }
                else {
                    
                }                
            }
            else {
                let l0 = instance.valuedPicArray[instance.valuedPicIndex].constructor== Object;
                let l1 = (instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) && (instance.childArrayIndex == instance.valuedPicArray[instance.valuedPicIndex].length - 1);
                if (l0 || l1) {
                    instance.valuedPicIndex++;
                    if (instance.valuedPicArray[instance.valuedPicIndex].constructor== Object) {

                    }
                    else if (instance.valuedPicArray[instance.valuedPicIndex].constructor == Array) {                        
                        instance.childArrayIndex = 0;
                    }
                }
                else {                    
                    instance.childArrayIndex++;
                }                
            }
            //图片一级切换和判断绑定二级放大事件
            _switchPicAndBindEnlarge(instance);
            //边界箭头效果与tip显示
            _borderArrowAndTipsShow(instance);            
        });
    };
    //边界箭头效果与tip显示
    var _borderArrowAndTipsShow = function (instance) {        
        //左边界
        if (instance.valuedPicIndex == 0) {
            //通过样式opacity和z-index来控制dom隐藏的另一种方式
            instance.lArrow.css({ 'opacity': '0', 'z-index': '-1' });
            instance.lTips.show();
            setTimeout(function () {
                instance.lTips.hide();
            }, 1000);
        }
        //右边界
        else if ((instance.valuedPicIndex == instance.valuedPicArray.length - 1)&&((instance.valuedPicArray[instance.valuedPicIndex].constructor== Object) || ((instance.valuedPicArray[instance.valuedPicIndex].constructor== Array) && (instance.childArrayIndex == instance.valuedPicArray[instance.valuedPicIndex].length - 1)))) {            
            //通过样式opacity和z-index来控制dom隐藏的另一种方式                            
            instance.rArrow.css({ 'opacity': '0', 'z-index': '-1' });
            instance.rTips.show();
            setTimeout(function () {
                instance.rTips.hide();
            }, 1000);
        }
        else {
            instance.lArrow.css({ 'opacity': '1', 'z-index': '40' });
            instance.rArrow.css({ 'opacity': '1', 'z-index': '40' });
            instance.lTips.hide();
            instance.rTips.hide();
        }
    };
    var _closePop = function (instance) {
        //closeBtn        
        instance.closeBtn.click(function () {            
            instance.pop.fadeOut();
            instance.openLevel = 0;
        });
    };
    //构造函数
    var PicPopFun = function (config) {

    };
    //初始化
    PicPopFun.prototype.init = function (config) {        
        //把this赋值再传入函数参数中，明确this是指什么，更语义化
        let instance = this;        
        //init中给实例添加属性 再暴露出去 这是init的作用
        //dom属性 点击的图片节点
        instance.id = config.id;
        instance.picLists = config.s;
        //pop属性 弹窗标识名
        instance.popName = '.' + instance.id;
        //增加弹窗
        _addPop(instance);
        instance.pop = top.$('.' + instance.id);        
        //img属性 弹窗图片标识名
        instance.img = instance.pop.find(top.$('img'));
        //关闭按钮
        instance.closeBtn = instance.pop.find(top.$('.close'));
        //左右控件        
        instance.LR = instance.pop.find(top.$('.b'));
        //左控件
        instance.l = instance.pop.find(top.$('.l'));
        //右控件
        instance.r = instance.pop.find(top.$('.r'));
        //左箭头
        instance.lArrow = instance.pop.find(top.$('i.l-i'));
        //右箭头
        instance.rArrow = instance.pop.find(top.$('i.r-i'));
        //左tips
        instance.lTips = instance.pop.find(top.$('.tips.l'));
        //右tips
        instance.rTips = instance.pop.find(top.$('.tips.r'));
        //src数组        
        instance.a = config.a;        
        //构建好的图片对象数组
        instance.valuedPicArray = [];        
        //公共变量挂载可以放这
        //公共变量
        //一级打开还是二级打开
        instance.openLevel = 0;        
        //当前有值的图片序号
        instance.valuedPicIndex = 0;        
        //子类图片序号
        instance.childArrayIndex = 0;
        //调用render渲染方法
        instance.render();
        //方便链式调用
        return instance;
    };
    //渲染 处理操作
    PicPopFun.prototype.render = function () {
        //把this赋值再传入函数参数中，明确this是指什么，更语义化	
        let instance = this;
        //私有方法里都是传实例 instance			
        //创建图片路径数组
        _createPicArrays(instance);        
        //open
        _openPop(instance);
        //mySwitch
        _mySwitch(instance);
        //close
        _closePop(instance);
    };
    //返回构造函数
    return PicPopFun;
})(jQuery);