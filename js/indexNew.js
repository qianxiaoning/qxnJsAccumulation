//调用
$(function(){	
	//静态方法调用		
	QxnStaticMethods.staticMethodA(1);
	QxnStaticMethods.staticMethodB({a:1});	
	//类方法初始化
	QxnClassMethods.Pop({selector:'.valued'});
	QxnClassMethods.Pop({selector:'.valued0'});
	//类方法初始化后调用原型方法
	QxnClassMethods.Pop({selector:'.valued'}).insWayA();
	QxnClassMethods.Pop({selector:'.valued'}).insWayB();
	//tab-show
	QxnStaticMethods.tabShow('.span','.div',function(){
		console.log(1);
	});
	//navUnderline
	QxnStaticMethods.navUnderline('.item','mouseenter');
	//slide
	QxnClassMethods.slide({items:'.slideItem'});
});
//定义
(function(global,$){
	//基础方法区（用以支持静态库和类库）
	//外层内层类的原型传递和constructor修正（用于插件化的外内层原型传递）
	var _prototypeTransmit_ConstructorCorrect = function(outerClass){
		//Init是outerClass的不同名字的等价的一个类，不是父子，不需要继承
		//直接原型对接（同一个指针，互相影响）
		outerClass.prototype.Init.prototype = outerClass.prototype;
		//constructor指向修正
		outerClass.prototype.Init.prototype.constructor = outerClass.prototype.Init;
	};
	//检验所传参数是否为undefined,null,空''
	var _isUndefinedNullEmpty = function(param){
		let logic = true;
		if(param==undefined||param==null||param==''){
			logic = false;
		}
		return logic;
	};	
	//jqIns.css() optimize
	var _jqInsCssOptimize = function(jqIns,cssString){		
		for(let i=0;i<jqIns.length;i++){
			jqIns[i].style.cssText = jqIns[i].style.cssText+cssString;
		};
	};
	//增减量
	var _increaseDecrease = function(increaseOrDecrease,range,currentValue){
		if(increaseOrDecrease=='-'){
			currentValue = currentValue - range;			
		}
		else if(increaseOrDecrease=='+'){
			currentValue = currentValue + range;
		};		
		return currentValue;
	};	
	//边界判定
	var _boundaryDetermination = function(currentValue,maxValue){		
		let boundary = 0;
		if(currentValue<0){			
			boundary = 1;
		}
		else if(currentValue>maxValue){
			currentValue = maxValue;
			boundary = 2;
		};
		return boundary;//(1下边界2上边界0边界之间)
	};	
	//_switchOneItem
	var _switchOneItem = function(ins,direction,c){
		let items = ins.items;
		let wrap = ins.wrap;
		let currentValue = ins.currentValue;
		let maxValue = ins.maxValue;		
		let mode = ins.mode||'single';
		let distance = items.eq(0).outerWidth(true);		
		if(direction=='l'){				
			currentValue = _increaseDecrease('-',1,currentValue);
			let boundary = _boundaryDetermination(currentValue,maxValue);
			//下边界
			if(boundary==1){
				if(mode=='single'){
					currentValue = 0;
				}
				else if(mode=='loop'){
					currentValue = maxValue;
				}
			}			
		}
		else if(direction=='r'){								
			currentValue = _increaseDecrease('+',1,currentValue);			
			let boundary = _boundaryDetermination(currentValue,maxValue);	
			//上边界
			if(boundary==2){
				if(mode=='single'){
					currentValue = maxValue;
				}
				else if(mode=='loop'){
					currentValue = 0;
				}	
			};
		};
		ins.currentValue = currentValue;			
		//css
		_jqInsCssOptimize(wrap,'transform: translateX('+(-currentValue*distance)+'px);');
		//可能需要的执行函数
		if(c){
			c(ins);
		}		
	};
	//window resize触发
	var _windowResize = function(){		
		let argu = arguments;
		let fun = argu[argu.length-1];
		fun(argu);
		$(window).resize(function(){
			fun(argu);
		});
	};		
	//判断左右按钮初始化
	var _lRBtnShowInit = function(ins){		
		let maxValue = ins.maxValue;
		let l = ins.l;
		let r = ins.r;
		if(maxValue<=0){
			//都隐
			l.add(r).hide();
		}
		else{
			//左隐
			l.hide();
		}
	};
	//判断左右按钮显示与否
	var _lRBtnShowOr = function(ins){		
		let currentValue = ins.currentValue;
		let maxValue = ins.maxValue;
		let l = ins.l;
		let r = ins.r;
		if(currentValue==0){
			//左隐
			l.hide();	
		}
		else if(currentValue==maxValue){
			//右隐			
			r.hide();	
		}
		else{
			//都显
			l.add(r).show();
		}
	};
	//静态方法组件库
	QxnStaticMethods = {
		//组件库版本号	
		version:'1.0',
		//静态方法（不需要生成实例对象）
		staticMethodA:function(a){
			console.log(a);			
		},		
		staticMethodB:function(options){
			console.log(options);
		},			
		//tab-show
		tabShow:function(a,b,c){
			let span = $(a);
			let div = $(b);
			let index = 0;
			span.click(function(){
				$(this).addClass('on').siblings().removeClass('on');
				if(b){
					index = $(this).index();
					div.eq(index).addClass('on').siblings().removeClass('on');
				};
				if(c){
					c();
				};								
			});			
		},
		//nav underline
		navUnderline:function(a,b,c){
			let wrap = $(a).parent();
			let items = $(a);
			let line = {};
			let dot = {};
			let dotHeight = '3px';
			let lineBg = '#d4d6d4';
			//增加line
			if(wrap.children('.navUnderline').length==0){
				wrap.append("<span class='navUnderline'><i></i></span>");
				line = $('.navUnderline');
				dot = line.children('i');
			};
			//样式
			let wrapWidth = 0;
			for(let i=0;i<items.length;i++){
				wrapWidth += items.eq(i).width();
			};
			wrap.css({'width':wrapWidth+'px','margin':'0 auto','overflow':'hidden','position':'relative'});
			line.css({'position':'absolute','height':'2px','background':lineBg,'left':'0','bottom':'0','transition':'all .5s'});
			dot.css({'position':'absolute','width':'0','height':'0','border-left':dotHeight+' solid transparent','border-right':'3px solid transparent','border-bottom':'3px solid '+lineBg,'top':'-'+dotHeight,'left':'0','right':'0','margin':'auto'});
			items.on(b,function(){
				line.css({'width':$(this).width()+'px','left':$(this).position().left+'px'});	
				$(this).addClass('on').siblings(a).removeClass('on');
				if(c){
					c();
				};		
			});
		}		
	};
	//类方法组件库
	QxnClassMethods = {
		//组件库版本号	
		version:'1.0',
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
					_generalFunA();
					let ins = this;
					//添加实例属性					
					ins.a = [];			
					//个体方法（按需传入实例）
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
			//外层内层类的原型传递和constructor修正（用于插件化的外内层原型传递）
			_prototypeTransmit_ConstructorCorrect(AFun);	
			//暴露父类给外层变量ClassMethodA			
			return AFun;
		}()),	
		//站酷式图片展示
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
			//外层内层类的原型传递和constructor修正（用于插件化的外内层原型传递）
			_prototypeTransmit_ConstructorCorrect(PopFun);	
			//暴露父类给window
			return PopFun;
		}()),
		//展示块左右滑动
		slide:(function(){						
			//个体方法
			var _calcu = function(ins){	
				let items = ins.items; 			
				let wrap = ins.wrap;
				let transitionTime = ins.transitionTime;	
				let wrapWidth = 0;
				for(let i=0;i<items.length;i++){
					wrapWidth += items.eq(0).outerWidth(true);
				};				
				_jqInsCssOptimize(wrap,'width:'+wrapWidth+'px;transition:all '+transitionTime);
			};		
			var _addLR = function(ins){
				let items = ins.items; 			
				let wrap = ins.wrap; 			
				wrap.parent().after("<div class='slideL'>1</div><div class='slideR'>2</div>");
				//css
				_jqInsCssOptimize($('.slideL,.slideR'),'position: absolute;top: 0;bottom: 0;height: 20px;z-index:20;margin: auto;width:100px;background: #767fbf;');
				_jqInsCssOptimize($('.slideL'),'left:0');		
				_jqInsCssOptimize($('.slideR'),'right:0');
				ins.l = $('.slideL');			
				ins.r = $('.slideR');	
				//判断左右按钮初始化
				_lRBtnShowInit(ins);				
			};					
			var _lClick = function(ins){
				ins.l.off('click').click(function(){
					_switchOneItem(ins,'l',_lRBtnShowOr);
				});
			};
			var _rClick = function(ins){
				ins.r.off('click').click(function(){
					_switchOneItem(ins,'r',_lRBtnShowOr);
				});
			};
			//外层类
			var slideFun = function(options){		
				//把参数传入Init类，并返回Init实例				
				return new slideFun.prototype.Init(options);	
			};
			//（初始化Init类）和（各种实例单独的方法效果）
			slideFun.prototype = {
				Init:function(options){					
					let ins = this;
					//添加实例属性
					ins.items = $(options.items);					
					ins.itemWidth = ins.items.eq(0).outerWidth(true);
					ins.wrap = ins.items.parent();			
					ins.l = {};			
					ins.r = {};
					//速度
					ins.transitionTime = '.5s';
					//模式
					ins.mode = 'single';
					ins.currentValue = 0;					
					_windowResize(ins,function(argu){			
						// argu[0].maxValue = argu[0].items.length-1;	
						argu[0].maxValue = argu[0].items.length - parseInt($(window).width()/argu[0].itemWidth);	
					});
					//个体方法（按需传入实例）
					_calcu(ins);
					_addLR(ins);
					_lClick(ins);
					_rClick(ins);	
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
			//外层内层类的原型传递和constructor修正（用于插件化的外内层原型传递）
			_prototypeTransmit_ConstructorCorrect(slideFun);	
			//暴露父类给外层变量ClassMethodA			
			return slideFun;
		}()),
	};
	//静动态组件库挂载window 
	window.QxnStaticMethods = QxnStaticMethods;
	window.QxnClassMethods = QxnClassMethods;	
})(this,jQuery);