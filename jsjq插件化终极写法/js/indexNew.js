//样本版
$(function(){
	//调用
	pop({selector:'.valued'});//Init类实例
	pop({selector:'.valued0'});
	pop({selector:'.valued'}).insWayA();//Init实例调用PopFun的原型方法，如insWayA
	pop({selector:'.valued'}).insWayB();//Init实例调用PopFun的原型方法，如insWayB
});
var pop = (function(global,$){ 
	//通用变量
	var pop,c,r;
	//通用方法
	//生成通用弹窗
	var _addPop = function(){		
		let popHtml = "<div class='picPopPlug'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
		if(top.$('.picPopPlug').length==0){
			top.$('body').append(popHtml);
			//通用变量赋值
			pop = $('.picPopPlug');
			c = pop.find('.iclose'); 
			r = pop.find('.r');					
			//调用通用方法
			_close();
		};		
	};	
	//个体方法
	var _cA = function(ins){
		for(let i=0;i<ins.pic.length;i++){
			ins.a.push(ins.pic.eq(i).attr('src'));
		}		
	};	
	var _show = function(ins){				
		ins.pic.off('click').click(function(){			
			pop.show();			
			//点击具体pic时传入切换函数不同实例			
			_s(ins);
		});		
	};
	var _close = function(){		
		c.off('click').click(function(){
			pop.hide();
		});
	};
	var _s = function(ins){
		r.off('click').click(function(){
			//核心 获取实例属性
			console.log(ins.a);			
		});
	};
	var PopFun = function(options){		
		//把参数传入Init类，并返回Init实例
		return new PopFun.prototype.Init(options);		
	};
	//（初始化Init类）和（各种实例单独的方法效果）
	PopFun.prototype = {
		Init:function(options){
			//通用方法
			_addPop();
			let ins = this;
			//添加实例属性
			ins.pic = $(options.selector);
			ins.a = [];			
			//传入实例
			_cA(ins);					
			_show(ins);		
			//返回实例，方便链式调用
			return ins;
		},
		//单独的实例方法效果
		insWayA:function(){
			let ins = this;
			//获取参数
			//ins.options	
			console.log(1);			
		},
		insWayB:function(){
			let ins = this;
			console.log(1);			
		}
	};	
	//Init是PopFun的不同名字的等价的一个类，不是父子，不需要继承
	//直接原型对接（同一个指针，互相影响）
	PopFun.prototype.Init.prototype = PopFun.prototype;
	//constructor指向修正
	PopFun.prototype.Init.prototype.constructor = PopFun.prototype.Init;
	//暴露父类给外层变量pop
	return PopFun;
})(this,jQuery);
//--------------------------------------------------
//基础版
// $(function(){
// 	//调用
// 	a(Object);//Init类实例
// 	a(Object).insWayA();//Init实例调用A的原型方法，如insWayA
// 	a(Object).insWayB();//Init实例调用A的原型方法，如insWayB
// });
// var a = (function(global,$){
// 	//通用方法
// 	var _commonWayA = function(){

// 	};
// 	//个体方法
// 	var _a = function(ins){

// 	};
// 	//类
// 	var A = function(options){		
// 		//把参数传入Init类，并返回Init实例	
// 		return new A.prototype.Init(options);	
// 	};
// 	//父类原型（Init类）和（各种实例单独的方法效果）
// 	A.prototype = {
// 		Init:function(options){
// 			_commonWayA();
// 			//ins实例
// 			let ins = this;
// 			//添加实例属性
// 			ins.options = options;			
// 			//传入实例
// 			_a(ins);
// 			//返回实例，方便链式调用			
// 			return ins;
// 		},
// 		insWayA:function(){
// 			let ins = this;
// 			//获取参数
// 			//ins.options	
// 			console.log(1);		
// 		},
// 		insWayB:function(){
// 			let ins = this;
// 			console.log(1);			
// 		}
// 	};	
// 	//Init是A的不同名字的等价的一个类，不是父子，不需要继承
// 	//直接原型对接（同一个指针，互相影响）
// 	PopFun.prototype.Init.prototype = PopFun.prototype;
// 	//constructor指向修正
// 	PopFun.prototype.Init.prototype.constructor = PopFun.prototype.Init;
// 	//暴露父类给window
// 	return A;
// })(this,jQuery);