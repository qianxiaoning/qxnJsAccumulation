$(function(){	
	//静态方法调用		
	Qxn.staticMethodA(1);
	Qxn.staticMethodB({a:1});	
	//类方法初始化
	Qxn.Pop({selector:'.valued'});
	Qxn.Pop({selector:'.valued0'});
	//类方法初始化后调用原型方法
	Qxn.Pop({selector:'.valued'}).insWayA();
	Qxn.Pop({selector:'.valued'}).insWayB();
});
//js组件库写法
//自己的组件库
(function(global,$){
	Qxn = {
		//组件库版本号	
		version:'1.0',
		//静态方法（不需要生成实例对象）
		staticMethodA:function(a){
			console.log(a);			
		},		
		staticMethodB:function(options){
			console.log(options);
		},
		//外层内层类的原型传递和constructor修正（用于插件化的外内层原型传递）
		prototypeTransmit_ConstructorCorrect:function(outerClass){
			//Init是outerClass的不同名字的等价的一个类，不是父子，不需要继承
			//直接原型对接（同一个指针，互相影响）
			outerClass.prototype.Init.prototype = outerClass.prototype;
			//constructor指向修正
			outerClass.prototype.Init.prototype.constructor = outerClass.prototype.Init;
		},
		//类方法（需要生成实例对象）
		ClassMethodA:(function(){
			//通用变量
			var generalVariable;
			//通用方法			
			var _generalFunA = function(){				
				//通用变量赋值
				generalVariable = 'xxx';
				//调用通用方法
				_generalFunB();
			};
			var _generalFunB = function(){				
				
			};
			//个体方法
			var _individualMethodA = function(ins){
				ins.a = [];				
			};				
			//外层类
			var AFun = function(options){		
				//把参数传入Init类，并返回Init实例				
				return new PopFun.prototype.Init(options);		
			};
			//（初始化Init类）和（各种实例单独的方法效果）
			AFun.prototype = {
				Init:function(options){
					//通用方法
					_addPop();
					let ins = this;
					//添加实例属性					
					ins.a = [];			
					//传入实例
					_individualMethodA(ins);				
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
			// Qxn.prototypeTransmit_ConstructorCorrect(AFun);			
			//暴露父类给外层变量ClassMethodA			
			return AFun;
		}()),	
		Pop:(function(){
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
			//父类原型（Init类）和（各种实例单独的方法效果）
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
			// Qxn.prototypeTransmit_ConstructorCorrect(PopFun);	
			//暴露父类给window
			return PopFun;
		}())	
	};
	window.Qxn = Qxn;
	// //大类版本号
	// var version = '1.0';
	// //大类	
	// var Qxn = function(){
		
	// };
	// Qxn.prototype = {
	// 	//大类基本属性
	// 	Qxn: version,
	// 	constructor: Qxn,
	// 	length: 0		
	// };
	// //小类添加方法
	// Qxn.addClassMethod = function(ClassesObject){		
	// 	for(ClassesName in ClassesObject){					
	// 		if(ClassesName.indexOf('prototype')<0){				
	// 			//为小类
	// 			Qxn[ClassesName] = ClassesObject[ClassesName];
	// 		}
	// 		else{				
	// 			//为小类原型
	// 			var ClassesPrototypeName = ClassesName;
	// 			var ClassesName = ClassesName.replace('prototype','');		
	// 			Qxn[ClassesName].prototype = ClassesObject[ClassesPrototypeName];	
	// 		}						
	// 	}
	// };
	// Qxn.addClassMethod({
	// 	//小类
	// 	A:function(options){
	// 		//init初始化传参		
	// 		return new Qxn.A.prototype.init(options);
	// 	},
	// 	//小类原型
	// 	Aprototype:{
	// 		//init初始化传参
	// 		init:function(options){			
	// 			console.log(options);			
	// 			return Qxn.A.prototype;			
	// 		},					
	// 		a:function(){
	// 			console.log(1);			
	// 		}
	// 	},
	// 	B:function(options){
	// 		//init初始化传参		
	// 		return new Qxn.B.prototype.init(options);
	// 	},		
	// 	Bprototype:{
	// 		//init初始化传参
	// 		init:function(options){			
	// 			console.log(options);			
	// 			return Qxn.B.prototype;			
	// 		},					
	// 		a:function(){
	// 			console.log(1);			
	// 		}
	// 	}
	// });	
	// //大类静态方法添加方法
	// Qxn.addStaticMethod = function(staticMethodsObject){
	// 	for(staticMethodsName in staticMethodsObject){			
	// 		Qxn[staticMethodsName] = staticMethodsObject[staticMethodsName];			
	// 	}
	// };
	// Qxn.addStaticMethod({
	// 	//大类静态方法
	// 	a:function(a){
	// 		console.log(a);
	// 	},		
	// 	b:function(options){
	// 		console.log(options);
	// 	}
	// });
	// window.Qxn = Qxn;	
})(this,jQuery);
//-------------------------------------------
// $(function(){		
// 	//调用小类
// 	Qxn.A({num:1});
// 	//调用小类方法
// 	Qxn.A({num:1}).a();
// 	//调用大类静态方法
// 	Qxn.a(1);
// 	Qxn.b({
// 		type:'get',
// 		url:'aaa',
// 		dataType:'json'
// 	});
// });
// //js组件库写法
// //自己的组件库
// (function(global,$){
// 	//大类版本号
// 	var version = '1.0';
// 	//大类	
// 	var Qxn = function(){
		
// 	};
// 	Qxn.prototype = {
// 		//大类基本属性
// 		Qxn: version,
// 		constructor: Qxn,
// 		length: 0		
// 	};
// 	//小类添加方法
// 	Qxn.addClassMethod = function(ClassesObject){		
// 		for(ClassesName in ClassesObject){					
// 			if(ClassesName.indexOf('prototype')<0){				
// 				//为小类
// 				Qxn[ClassesName] = ClassesObject[ClassesName];
// 			}
// 			else{				
// 				//为小类原型
// 				var ClassesPrototypeName = ClassesName;
// 				var ClassesName = ClassesName.replace('prototype','');		
// 				Qxn[ClassesName].prototype = ClassesObject[ClassesPrototypeName];	
// 			}						
// 		}
// 	};
// 	Qxn.addClassMethod({
// 		//小类
// 		A:function(options){
// 			//init初始化传参		
// 			return new Qxn.A.prototype.init(options);
// 		},
// 		//小类原型
// 		Aprototype:{
// 			//init初始化传参
// 			init:function(options){			
// 				console.log(options);			
// 				return Qxn.A.prototype;			
// 			},					
// 			a:function(){
// 				console.log(1);			
// 			}
// 		},
// 		B:function(options){
// 			//init初始化传参		
// 			return new Qxn.B.prototype.init(options);
// 		},		
// 		Bprototype:{
// 			//init初始化传参
// 			init:function(options){			
// 				console.log(options);			
// 				return Qxn.B.prototype;			
// 			},					
// 			a:function(){
// 				console.log(1);			
// 			}
// 		}
// 	});	
// 	//大类静态方法添加方法
// 	Qxn.addStaticMethod = function(staticMethodsObject){
// 		for(staticMethodsName in staticMethodsObject){			
// 			Qxn[staticMethodsName] = staticMethodsObject[staticMethodsName];			
// 		}
// 	};
// 	Qxn.addStaticMethod({
// 		//大类静态方法
// 		a:function(a){
// 			console.log(a);
// 		},		
// 		b:function(options){
// 			console.log(options);
// 		}
// 	});
// 	window.Qxn = Qxn;
// 	return Qxn;	
// })(this,jQuery);