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
  	myExample.init({selector:'.wrap'});  	
});
//定义
//插件名
var PicPop = (function(){
	//私有方法	
	//私有方法里that是实例
	//私有方法
	var _addPop = function(that){		
		let popHtml = "<div class='picPop'><div class='layer'></div><img src='' alt=''></div>";
		if($(that.pop).length==0){
			$('body').append(popHtml);
		}		
	};
	//私有方法1 open
	var _open = function(that){
		//that为实例
		that.dom.click(function(e){			
			$(that.pop).fadeIn();			
			$(that.img).attr('src',$(this).attr('src'));
			//阻止事件冒泡
			var e=e||window.event;
			e.stopPropagation();
			e.cancelBubble = true;
		});
	};
	//私有方法2 close
	var _close = function(that){
		$(document).click(function(){
			$(that.pop).fadeOut();						
		});
	};	
	//构造函数
	var PicPopFun = function(config){

	};	
	//初始化
	PicPopFun.prototype.init = function(config){		
		//init中给实例添加属性 再暴露出去 这是init的作用
		//dom属性 点击的图片节点
		this.dom = $(config.selector).find('img');
		//pop属性 弹窗标识名
		this.pop = '.picPop';
		//img属性 弹窗图片标识名
		this.img = '.picPop img';
		//调用render渲染方法
		this.render();
		//方便链式调用
		return this;
	};
	//渲染 处理操作
	PicPopFun.prototype.render = function(){		
		//私有方法里都是传实例 this
		//增加弹窗
		_addPop(this);		
		//open
		_open(this);
		//close
		_close(this);		
	};
	//返回构造函数
	return PicPopFun;
})();