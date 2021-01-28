// 示例
// 需求 输入框 后面显示输入的字数
$(function() {	
	//实例化	
  	var myExample = new TextCount();
  	//调用实例方法
  	myExample.init({id:'#myInput'}).render();  	
});
//插件名
//匿名函数 自动执行闭包法 {}函数传入()方法中 ({})()
var TextCount = (function(){	
	//私有方法，外面将访问不到
	//that为实例对象
	//_bind私有方法 绑定事件
	var _bind = function(that){		
		//that.input即为节点 绑定keyup事件
		that.input.on('keyup',function(){			
			//给实例执行render实例方法
			that.render();
		});
	}
	//_getNum私有方法 得到字数
	var _getNum = function(that){
		//that为实例对象
		//返回 节点的值的长度
		return that.input.val().length;
	}
	//构造函数
	var TextCountFun = function(config){
		
	}	
	//原型添加 初始化
	TextCountFun.prototype.init = function(config) {
		//init一般是传入一个对象 option或config
		//this是实例对象		
		//给jq实例添加input属性 并赋值 input属性即为节点
		this.input = $(config.id);
		//调用私有方法
		_bind(this);
		return this;
	};
	//原型添加 渲染文本
	TextCountFun.prototype.render = function() {
		//this为实例对象 传入私有方法_getNum中
		var num = _getNum(this);
		//得到字数
		if ($('#myInput_count').length == 0) {
			this.input.after('<span id="myInput_count"></span>');
		};
		$('#myInput_count').html(num+'个字');
	};
	//返回构造函数
	return TextCountFun;
})();
// ---------------------------------------------------------
// 我的练习
// 需求 图片框 点击放大 点击关闭
$(function(){	
	var myExample = new PicPop();  	
  	myExample.init({selector:'.valued'});  	
});
//定义
//插件名
var PicPop = (function(){	
	//私有方法	
	//私有方法里that是实例
	//_私有方法	
	var _createPicArrays = function(instance){				
		for(let i=0;i<instance.picLists.length;i++){
			let jsDom = instance.picLists[i];
			let picObj = {};
			picObj.src = instance.picLists.eq(i).attr('src');
			picObj.mode = _judgeModel(instance,jsDom);			
			instance.valuedPicArray.push(picObj);
		}				
	};	
	var _addPop = function(instance){		
		let popHtml = "<div class='picPopPlug'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
		if(top.$(instance.popName).length==0){
			top.$('body').append(popHtml);
		}		
	};	
	//判断模式
	var _judgeModel = function(instance,jsDom){		
		//获取图片原始尺寸
		let imageCopy = new Image();
		imageCopy.src = jsDom.src;
		let imgWidth = imageCopy.width;
		let imgHeight = imageCopy.height;
		let wWidth = $(window).width();
		let wHeight = $(window).height();
		let mode = '';		
		//wOrigin
		if(imgWidth>wWidth&&imgHeight<wHeight){
			mode = 'wOrigin';			
		}
		//hOrigin
		else if(imgWidth<wWidth&&imgHeight>wHeight){
			mode = 'hOrigin';	
		}
		//whOrigin
		else if(imgWidth>wWidth&&imgHeight>wHeight){
			mode = 'whOrigin';
		}
		else{
			mode = 'zip';	
		}		
		return mode;
	}
	//给popImg绑定放大事件
	var _popImgClick = function(instance,mode){			
		instance.img.attr('class','zip plus');
		//已放大
		$(top).off('click').click(function(){				
			if(instance.openLevel==2){					
				//给document绑定缩小事件				
				$(top.document).off('click').click(function(){		

					instance.openLevel = 1;
					//左右及关闭控件显示
					instance.LR.show();
					instance.closeBtn.css({'opacity':'1','z-index':'40'});
					//替换class
					instance.img.attr('class','zip plus');	
					instance.pop.attr('class','picPopPlug');			
					$(top.document).off('click');
					instance.openLevel = 1;
					//一级esc退出按钮
					_escExit(instance);
				})
			}	
			//刚进去 未放大
			else if(instance.openLevel==1){				
				instance.img.off('click').click(function(e){
					//二级打开
					instance.openLevel = 2;		
					//左右及关闭控件隐藏
					instance.LR.hide();
					instance.closeBtn.css({'opacity':'0','z-index':'-1'});
					//替换class
					instance.img.attr('class',mode+' reduce');
					instance.pop.attr('class','picPopPlug reduce');
					instance.img.off('click');
					instance.openLevel = 2;		
					//二级esc退出按钮
					_escExit(instance);		
				})
			}			
		})		
	}	
	//图片一级切换和判断绑定二级放大事件
	var _switchPicAndBindEnlarge = function(instance){				
		//判断模式			
		let mode = instance.valuedPicArray[instance.valuedPicIndex].mode;			
		//判断img模式 预设第二次点击			
		if(mode=='zip'){
			//给popImg和window清空放大点击事件
			instance.img.off('click');	
			$(window).off('click');			
		}			
		else{				
			//给popImg和pop绑定事件
			_popImgClick(instance,mode);				
		}									
		instance.img.attr('src',instance.valuedPicArray[instance.valuedPicIndex].src);
	}
	var _openPop = function(instance){
		//that为实例
		instance.picLists.off('click').click(function(e){	
			//把this赋值再传入函数参数中，明确this是指什么，更语义化
			let jsDom = this;
			//第一次点击的初始化 开始
			//第一次点击赋class
			instance.img.attr('class','zip');
			//左右及关闭控件恢复
			instance.LR.show();
			instance.closeBtn.css({'opacity':'1','z-index':'40'});
			instance.pop.attr('class','picPopPlug');					
			//第一次点击的初始化 结束
			//instance.valuedPicArray
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
	var _escExit = function(instance){
		//一级打开
		if(instance.openLevel==1){
			//让top层获得焦点            
            top.focus();
			$(document).off('keydown').keydown(function(e){
				var e=e||window.event;						
				if(e.keyCode==27){
					instance.pop.fadeOut();
					instance.openLevel = 0;				
				}
			});
		}
		//二级打开
		else if(instance.openLevel==2){
			$(document).off('keydown').keydown(function(e){
				var e=e||window.event;						
				if(e.keyCode==27){
					//左右及关闭控件显示
					instance.LR.show();
					instance.closeBtn.css({'opacity':'1','z-index':'40'});
					//替换class
					instance.img.attr('class','zip plus');	
					instance.pop.attr('class','picPopPlug');			
					$(top.document).off('click');					
					instance.openLevel = 1;			
					//一级esc退出按钮
					_escExit(instance);	
				}
			});
		}		
	};
	var _mySwitch = function(instance){
		//that为实例		
		instance.l.off('click').click(function(){
			if(instance.valuedPicIndex==0){
				
			}
			else{
				instance.valuedPicIndex--;								
			};						
			//图片一级切换和判断绑定二级放大事件
			_switchPicAndBindEnlarge(instance);
			//边界箭头效果与tip显示
			_borderArrowAndTipsShow(instance);		
		});
		instance.r.off('click').click(function(){
			if(instance.valuedPicIndex==instance.valuedPicArray.length-1){
				
			}
			else{
				instance.valuedPicIndex++;								
			};						
			//图片一级切换和判断绑定二级放大事件
			_switchPicAndBindEnlarge(instance);
			//边界箭头效果与tip显示
			_borderArrowAndTipsShow(instance);		
		});
	};
	//边界箭头效果与tip显示
	var _borderArrowAndTipsShow = function(instance){	
		//左边界
		if(instance.valuedPicIndex==0){			
			//通过样式opacity和z-index来控制dom隐藏的另一种方式
			instance.lArrow.css({'opacity':'0','z-index':'-1'});
			instance.lTips.show();
			setTimeout(function(){
				instance.lTips.hide();
			},1000);
		}
		//右边界
		else if(instance.valuedPicIndex==instance.valuedPicArray.length-1){
			//通过样式opacity和z-index来控制dom隐藏的另一种方式
			instance.rArrow.css({'opacity':'0','z-index':'-1'});
			instance.rTips.show();			
			setTimeout(function(){
				instance.rTips.hide();
			},1000);
		}
		else{						
			instance.lArrow.css({'opacity':'1','z-index':'40'});	
			instance.rArrow.css({'opacity':'1','z-index':'40'});	
			instance.lTips.hide();
			instance.rTips.hide();				
		}
	};	
	var _closePop = function(instance){
		//closeBtn
		instance.closeBtn.click(function(){
			instance.pop.fadeOut();		
			instance.openLevel = 0;				
		});			
	};	
	//构造函数
	var PicPopFun = function(config){

	};		
	//原型
	PicPopFun.prototype = {
		//初始化
		init:function(config){
			//把this赋值再传入函数参数中，明确this是指什么，更语义化
			let instance = this;	
			//init中给实例添加属性 再暴露出去 这是init的作用		
			//dom属性 点击的图片节点
			instance.picLists = $(config.selector);
			//pop属性 弹窗标识名
			instance.popName = '.picPopPlug';
			//增加弹窗
			//在init里先生成dom 先取到dom对象，避免上面在事件中取top对象出错
			//在事件中取top对象似乎会读缓存，然后top又不存在，迷之bug
			_addPop(instance);
			instance.pop = top.$('.picPopPlug');
			//img属性 弹窗图片标识名
			instance.img = top.$('.picPopPlug img');
			//关闭按钮
			instance.closeBtn = top.$('.picPopPlug .close');
	        //左右控件        
	        instance.LR = top.$('.picPopPlug .b');
	        //左控件
	        instance.l = top.$('.picPopPlug .l');
	        //右控件
	        instance.r = top.$('.picPopPlug .r');
	        //左箭头
	        instance.lArrow = top.$('.picPopPlug i.l-i');
	        //右箭头
	        instance.rArrow = top.$('.picPopPlug i.r-i');
	        //左tips
	        instance.lTips = top.$('.picPopPlug .tips.l');
	        //右tips
	        instance.rTips = top.$('.picPopPlug .tips.r');
			//公共变量挂载可以放这
			//公共变量
			//一级打开还是二级打开
			instance.openLevel = 0;	
			//有值的图片数组
			instance.valuedPicArray = [];
			//当前有值的图片序号
			instance.valuedPicIndex = 0;	
			//调用render渲染方法
			instance.render();
			//方便链式调用
			return instance;
		},
		//渲染 处理操作
		render:function(){
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
		}
	};			
	//返回构造函数
	return PicPopFun;
})();
