//页面计算问题
function setRootSize() {
	var deviceWidth = document.documentElement.clientWidth; 
	if(deviceWidth>640){deviceWidth = 640;}
	document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
}
setRootSize();
window.addEventListener('resize', function () {
    setRootSize();
}, false);
$(document).ready(function(){
	setRootSize();
});

//选项卡部分
function menuCheckShow(menuid,mname,sumid,sname,_hover,_starnum){
	var _menu = $("#"+menuid).find(mname);
	var _arr = $("#"+sumid).find(sname);
	var _index = _starnum;
	_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
	_menu.hover(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
		});
	_menu.click(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
		});
}

//评价星星效果
function reviewsBox(boxid,_name,_hover){
	var _box = $(boxid);
	var _arr = _box.find(_name);
	var _index = 0;
	var _now = _box.find("."+_hover).length;
	
	var _checkNow = function(_num){
		_arr.removeClass(_hover);
			for(var i=0;i<=_num;i++){
			  _arr.eq(i).addClass(_hover);
			  }
		};//fun END
	_arr.hover(function(){
		_index = $(this).index();
		_checkNow(_index);
		},function(){
			_checkNow(_now-1);
			});
	_arr.click(function(){
		    _now = $(this).index();
		    for(var i=0;i<=_now;i++){
			  _arr.eq(i).addClass(_hover);
			  }
			_now += 1;
		});
}

//横向左右滑动
function listInfeedMove(boxid,_sum,_name,_num){
	var startX,startY,endX,endY;//定义判断变量
	var _box = $("#"+boxid);
	var _thesum = _box.find(_sum);
	var _arr = _box.find(_name);
	var _length = _arr.length;
	var _width = _box.width();
	var _index = 0;
	var _out = document.getElementById(boxid);
	
	//设置必要属性
	_box.css({"overflow":"hidden"});
	_thesum.css({"width":"99999px","position":"relative","left":"0"});
	_arr.css({"float":"left","display":"block"});
	
	var widthwin = function(){
		_width = _box.width()/_num;
		_arr.width(_width);
		var _mm = -_index*_width;
		_thesum.css({"left":_mm+"px"});
	};
	widthwin();
	$(window).resize(function(){widthwin();});
	
	//移动的主要方法
	var movenav = function(){
		if(_thesum.is(":animated")){_thesum.stop(true,true);}
		var _mm = -_index*_width;
		_thesum.animate({left:_mm+"px"},200);
	};
	
	var _nextnav = function(){
		_index++;
		if(_index > _length-_num){_index = _length-_num;}
		if(_length > _num){
			movenav();
			}
		};
	var _lastnav = function(){
		_index--;
		if(_index < 0){_index = 0;}
		if(_length > _num){
			movenav();
			}
		};
	
	var touchStart = function(event){
		var touch = event.touches[0];
		endX = 0;
		endY = 0;
        startX = touch.pageX;
		startY = touch.pageY;
		};
	var touchMove = function(event){
		var touch = event.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
		    //endY = (startY-touch.pageY);
			}
		};
	var touchEnd = function(event){
		if(endX > 50){
			_nextnav();
			}
		if(endX < -50){
			_lastnav();
			}
		};
	
	_out.addEventListener("touchstart", touchStart, false);
    _out.addEventListener("touchmove", touchMove, false);
    _out.addEventListener("touchend", touchEnd, false);
	
}

function checkManyBox(boxid,sumid,sumname,numid,numname,_hover,_bool){
	var startX,startY,endX,endY,startPos;//定义判断变量
	var _box = $(boxid);
	var _now,_nowbox,_nownum,_index,_nowsum,_width,_nowlength,_narr,_next;
	
	//相关方法定义
	var mainmove = function(){
		var _move = _width * _next;
		var _str_m = "translateX(-"+_move+"px)";
		var one_s = _nowbox.attr("adspeed");
		one_s = one_s/1000;
		_nowsum.css({
			"transition":"all "+one_s+"s ease-in-out",
			"-webkit-transition":"all "+one_s+"s ease-in-out",
			"transform":_str_m,
			"-webkit-transform":_str_m
			});
		_narr.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	}; 
	var nextImg = function(){		
		_index++;
		_next++;
		if(_index >= _nowlength){
			_index = 0;
			}
		if(_next == 1){
			_nowsum.css({
			    "transition":"none",
			    "-webkit-transition":"none",
			    "transform":"translateX(0px)",
			    "-webkit-transform":"translateX(0px)"
			  });  
		    }
		setTimeout(mainmove,5);
	};
	var lastImg = function(){		
		_index--;
		_next--;
		if(_index < 0){
			_index = _nowlength-1;
			}
		if(_next < 0){
			_next = _nowlength-1;
			var _mm = _nowlength * _width;
			_nowsum.css({
			    "transition":"none",
			    "-webkit-transition":"none",
			    "transform":"translateX(-"+_mm+"px)",
			    "-webkit-transform":"translateX(-"+_mm+"px)"
			  });  
		    }
		setTimeout(mainmove,5);
	};
	
	//循环使用
	for(var i=0;i<_box.length;i++){
		var _one = _box.eq(i);
		var one_s = _one.attr("adspeed");
		one_s = one_s/1000;
		var one_sum = _one.find(sumid);
		var one_l =	one_sum.find(sumname).length;
		one_sum.append(one_sum.html());
		one_sum.css({
		  "width":"99999px",
		  "overflow":"hidden",
		  "transition":"all "+one_s+"s ease-in-out",
		  "-webkit-transition":"all "+one_s+"s ease-in-out"
		});
		_one.css({"overflow":"hidden"});
		var _str ="";
		for(var j=1;j<=one_l;j++){
			_str +="<"+numname+">"+j+"</"+numname+">";
			}
		_one.find(numid).html(_str);
		_one.find(numid).find(numname).eq(0).addClass(_hover);
		
	}//for END
	
	var starinfo = function(){
		for(var i=0;i<_box.length;i++){
			var _one = _box.eq(i);
			var one_sum = _one.find(sumid);
			var one_arr = one_sum.find(sumname);
		    var one_width = _one.width();
			one_arr.css({
		        "width":one_width+"px",
		        "overflow":"hidden",
		        "float":"left"
		    });
		}
	};//fun END
	starinfo();
	$(window).resize(function(){
		starinfo();
		});
		
	var touchStart = function(event){
		_now = _box.index($(this));
		_nowbox = _box.eq(_now);
		_nowsum = _nowbox.find(sumid);
		_nownum = _nowbox.find(numid);
		_index = _nownum.find("."+_hover).index();
		_next = _index;
		_width = _nowbox.width();
		_narr = _nownum.find(numname);
		_nowlength = _narr.length;
		
		var touch = event.originalEvent.touches[0];
		endX = 0;
		endY = 0;
		startPos = +new Date;
        startX = touch.pageX;
		startY = touch.pageY;
		};
	var touchMove = function(event){
		var touch = event.originalEvent.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
		    //endY = (startY-touch.pageY);
			}
		};
	var touchEnd = function(event){
		var duration = +new Date - startPos;    // 滑动的持续时间
		if (Number(duration) > 100){
		  if(endX > 50){ nextImg(); }
		  if(endX < -50){ lastImg(); }
		}//time if
		};
	
	_box.bind("touchstart",touchStart);
	_box.bind("touchmove",touchMove);
	_box.bind("touchend",touchEnd);
}
//吐槽建议640 下拉框
function select(){
	var btn = $(".proposal .inside .o .fr .r");
	var options = $(".proposal .inside .o .option");
	var li = $(".proposal .inside .o .option ul li");
	var wrap = $(".proposal .inside .o .fr .l");
	btn.click(function(){
		if(options.css("display") == "none"){
			options.css("display","block");
		}
		else{
			options.css("display","none");
		}
	});
	li.click(function(){
		var _text = $(this).text();
		wrap.text(_text);
		//options.css("display","none");
	});
	$(document).click(function(e){
		var target = e.target;
		if($(target).attr("class") !== "r"){
			console.log(1)
			options.css("display","none");
		}
	});
}
//我的二维码合 选项卡
function qr_tab(){
	var btn = $(".qrcode nav ul li");
	var options = $(".options");
	btn.click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var _index = $(this).index();
		options.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//点击或滑动关闭当前弹窗
function winCloseMyWin(boxid){
	var _arr = $(boxid);
	_arr.click(function(){
		$(this).parent().fadeOut(200);
	});
	var touchStart = function(event){
		var touch = event.originalEvent.touches[0];
		$(this).parent().fadeOut(200);
	};
	_arr.bind("touchstart",touchStart);
}
//提交订单-640-弹窗
function popup(){
	var btn = $(".proinfocheck .box02 .p1 .btn1");
	var popup_send = $(".popup_send");
	//叉
	var close = $(".carwintit a");
	var close1 = $(".proinfocity .tit a");
	//新增地址按钮
	var add_btn = $(".submit_man0 .add .p");
	var popup_add = $(".popup_add");
	close.click(function(){
		$(this).parents("aside").fadeOut(200);
	});
	close1.click(function(){
		$(this).parents("aside").fadeOut(200);
	})
	console.log(popup_send.length);
	btn.click(function(){
		popup_send.show();
	})
	add_btn.click(function(){
		popup_add.show();
	})
	var choose_btn = $(".submit_man .add .p");
	var popup_choose = $(".popup_choose");
	choose_btn.click(function(){
		popup_choose.show();
	})
}
