$(function(){
	var v = new Text();
	v.init({selector:'.valued'});
	var v0 = new Text();
	v0.init({selector:'.valued0'});
});
//法1：弹框作为实例一部分，每实例一个，就生成一个弹框
// var Text = (function(){
// 	var _addPop = function(config){		
// 		let popHtml = "<div class='picPopPlug "+config.selector.replace('.','plug_')+"'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
// 		if(top.$('.'+config.selector.replace('.','plug_')).length==0){
// 			top.$('body').append(popHtml);
// 		}		
// 	};
// 	var _cA = function(ins){
// 		for(let i=0;i<ins.pic.length;i++){
// 			ins.a.push(ins.pic.eq(i).attr('src'));
// 		}
// 	};
// 	var _show = function(ins){		
// 		ins.pic.off('click').click(function(){
// 			ins.pop.show();			
// 		});
// 	};
// 	var _close = function(ins){		
// 		ins.c.off('click').click(function(){
// 			ins.pop.hide();
// 		});
// 	};
// 	var _s = function(ins){
// 		ins.r.off('click').click(function(){
// 			//核心
// 			console.log(ins.a);
// 		});
// 	};
// 	var TextFun = function(){

// 	};
// 	TextFun.prototype = {
// 		init:function(config){
// 			_addPop(config);
// 			let ins = this;
// 			ins.pic = $(config.selector);
// 			ins.pop = $('.plug_'+config.selector.replace('.',''));
// 			ins.c = ins.pop.find('.iclose'); 
// 			ins.r = ins.pop.find('.r'); 
// 			ins.a = [];
// 			//
// 			ins.render();
// 			return ins;
// 		},
// 		render:function(){
// 			let ins = this;			
// 			_cA(ins);
// 			_show(ins);
// 			_close(ins);
// 			_s(ins);
// 		}
// 	};
// 	return TextFun;
// })();
//法2：弹框为公共的生成一次。给实例绑定事件，从事件入口传入不同实例到图片切换方法里，给公共弹框切换数组。
var Text = (function(){
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
	var TextFun = function(){

	};
	TextFun.prototype = {
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
	return TextFun;
})();
//法3：弹框在实例中，每次点击图片生成弹框，每次关闭销毁弹框（对dom层的操作过多，不予考虑）
// var Text = (function(){
// 	var _addPop = function(){		
// 		let popHtml = "<div class='picPopPlug'><div class='layer'></div><img src='' alt='' class=''><i class='close iclose'></i><div class='b l'><i class='l-i ileft'></i><span class='tips l'>已经是第一张了</span></div><div class='b r'><i class='r-i iright'></i><span class='tips r'>已经是最后一张了</span></div></div>";		
// 		if(top.$('.picPopPlug').length==0){
// 			top.$('body').append(popHtml);
// 		}		
// 	};
// 	var _removePop = function(){
// 		$('.picPopPlug').remove();		
// 	};
// 	var _cA = function(ins){
// 		for(let i=0;i<ins.pic.length;i++){
// 			ins.a.push(ins.pic.eq(i).attr('src'));
// 		}
// 	};
// 	//事件入口
// 	var _show = function(ins){		
// 		ins.pic.off('click').click(function(){
// 			_addPop();
// 			ins.pop = $('.picPopPlug');
// 			ins.c = ins.pop.find('.iclose'); 
// 			ins.r = ins.pop.find('.r');			
// 			//点击不同的图片组，获取不同的实例，再传入switch切换
// 			ins.pop.show();			
// 			//传入不同实例			
// 			_s(ins);
// 			_close(ins);
// 		});		
// 	};
// 	var _close = function(ins){		
// 		ins.c.off('click').click(function(){
// 			ins.pop.hide();
// 			_removePop();
// 		});
// 	};
// 	var _s = function(ins){
// 		ins.r.off('click').click(function(){
// 			//核心
// 			console.log(ins.a);
// 		});
// 	};
// 	var TextFun = function(){

// 	};
// 	TextFun.prototype = {
// 		init:function(config){			
// 			let ins = this;
// 			ins.pic = $(config.selector);	
// 			ins.a = [];		
// 			//
// 			ins.render();
// 			return ins;
// 		},
// 		render:function(){
// 			let ins = this;	
// 			//传入当前实例		
// 			_cA(ins);
// 			//事件入口
// 			_show(ins);					
// 		}
// 	};
// 	return TextFun;
// })();