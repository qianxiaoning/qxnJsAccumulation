$(function(){
	var v = new Test();
	v.init({selector:'.valued'});
	var v0 = new Test();
	v0.init({selector:'.valued0'});
	// new test(".valued");
	// new test(".valued0");
});
//法1：私有函数法
var Test = (function(){
	var _addPop = function(config){		
		let popHtml = "<div class='picPopPlug'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
		if(top.$('.picPopPlug').length==0){
			top.$('body').append(popHtml);
		}		
	};
	var _cA = function(ins){
		for(let i=0;i<ins.pic.length;i++){
			ins.a.push(ins.pic.eq(i).attr('src'));
		}
	};
	//事件入口
	var _show = function(ins){		
		ins.pic.off('click').click(function(){
			//点击不同的图片组，获取不同的实例，再传入switch切换
			ins.pop.show();			
			//传入不同实例			
			_s(ins);
		});		
	};
	var _close = function(ins){		
		ins.c.off('click').click(function(){
			ins.pop.hide();
		});
	};
	var _s = function(ins){
		ins.r.off('click').click(function(){
			//核心
			console.log(ins.a);
		});
	};
	var TestFun = function(){

	};
	TestFun.prototype = {
		init:function(config){
			_addPop(config);
			let ins = this;
			ins.pic = $(config.selector);
			ins.pop = $('.picPopPlug');
			ins.c = ins.pop.find('.iclose'); 
			ins.r = ins.pop.find('.r');
			ins.a = [];
			//
			ins.render();
			return ins;
		},
		render:function(){
			let ins = this;	
			//传入当前实例		
			_cA(ins);
			//事件入口
			_show(ins);
			_close(ins);			
		}
	};
	return TestFun;
})();
//法2：原型挂载法 参照code
// (function(){
// 	var Test = function(el){	
// 		var ins = this;		
// 		this.pic = $(el);
// 		var _addPop = function(config){		
// 			let popHtml = "<div class='picPopPlug'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
// 			if(top.$('.picPopPlug').length==0){
// 				top.$('body').append(popHtml);
// 			}		
// 		};
// 		_addPop();		
// 		this.pop = $('.picPopPlug');
// 		this.c = this.pop.find('.iclose'); 
// 		this.r = this.pop.find('.r');
// 		this.a = [];		
// 		this.init(ins);		
// 	}
// 	Test.prototype = {
// 		init:function(ins){			
// 			this.cA(ins);
// 			this.show(ins);
// 			this.close(ins);
// 		},
// 		cA:function(ins){			
// 			for(let i=0;i<this.pic.length;i++){
// 				this.a.push(this.pic.eq(i).attr('src'));
// 			}
// 		},
// 		show:function(ins){			
// 			this.pic.off('click').click(function(){
// 				//点击不同的图片组，获取不同的实例，再传入switch切换				
// 				ins.pop.show();			
// 				//传入不同实例			
// 				ins.s(ins);
// 			});
// 		},
// 		close:function(ins){
// 			this.c.off('click').click(function(){
// 				ins.pop.hide();
// 			});
// 		},
// 		s:function(ins){
// 			this.r.off('click').click(function(){
// 				//核心
// 				console.log(ins.a);
// 			});
// 		}
// 	};
// 	window.test = Test;
// })();