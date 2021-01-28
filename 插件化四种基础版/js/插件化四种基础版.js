var a = (function(global,$){
	//私有方法
	var _a = function(){

	};
	//类
	var A = function(params0,params1){
		let ins = this;
		//函数内方法 接收参数
		ins.params0 = params0;
		ins.params1 = params1;		
		//初始化
		ins.init();
	};
	//原型（init实例初始化）和（各种实例单独的方法效果）
	A.prototype = {
		init:function(){
			//ins实例
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
			_a();
			return ins;
		},
		insWayA:function(){
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
		},
		insWayB:function(){
			let ins = this;
		}
	};
	return A;
})(this,jQuery);

//调用
new a();//A的实例init初始化
new a().insWayA();//A实例init初始化后调用insWayA原型方法
new a().insWayB();//A实例init初始化后调用insWayB原型方法
//----------------------------------
(function(global,$){
	//私有方法
	var _a = function(){

	};
	//类
	var A = function(params0,params1){
		let ins = this;
		//函数内方法 接收参数
		ins.params0 = params0;
		ins.params1 = params1;		
		//初始化
		ins.init();
	};
	//原型（init实例初始化）和（各种实例单独的方法效果）
	A.prototype = {
		init:function(){
			//ins实例
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
			_a();
			return ins;
		},
		insWayA:function(){
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
		},
		insWayB:function(){
			let ins = this;
		}
	};
	window.A = A;
})(this,jQuery);

//调用
new A();//A的实例init初始化
new A().insWayA();//A实例init初始化后调用insWayA原型方法
new A().insWayB();//A实例init初始化后调用insWayB原型方法
//----------------------------------
var a = (function(global,$){
	//私有方法
	var _a = function(){

	};
	//类
	var A = function(params0,params1){			
		return new A.prototype.Init(params0,params1);	
	};
	//原型（init实例初始化）和（各种实例单独的方法效果）
	A.prototype = {
		Init:function(params0,params1){
			//ins实例
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
			_a();			
			return ins;
		},
		insWayA:function(){
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
		},
		insWayB:function(){
			let ins = this;
		}
	};	
	//Init是A的不同名字的等价的一个类，不是父子，不需要继承
	//直接原型对接（同一个指针，互相影响）
	PopFun.prototype.Init.prototype = PopFun.prototype;
	//constructor指向修正
	PopFun.prototype.Init.prototype.constructor = PopFun.prototype.Init;
	return A;
})(this,jQuery);

//调用
a();//Init类实例
a().insWayA();//Init实例调用A的原型方法，如insWayA
a().insWayB();//Init实例调用A的原型方法，如insWayB
//----------------------------------
(function(global,$){
	//私有方法
	var _a = function(){

	};
	//类
	var A = function(params0,params1){			
		return new A.prototype.Init(params0,params1);	
	};
	//原型（init实例初始化）和（各种实例单独的方法效果）
	A.prototype = {
		Init:function(params0,params1){
			//ins实例
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
			_a();
			return ins;
		},
		insWayA:function(){
			let ins = this;
			//获取参数
			ins.params0	
			ins.params1
		},
		insWayB:function(){
			let ins = this;
		}
	};
	//后面用call之类	
	A.prototype.init.prototype = A.prototype;
	//constructor指向修正
	A.prototype.init.prototype.constructor = A.prototype.init;
	window.A = A;
})(this,jQuery);

//调用
A();//Init类实例
A().insWayA();//Init实例调用A的原型方法，如insWayA
A().insWayB();//Init实例调用A的原型方法，如insWayB