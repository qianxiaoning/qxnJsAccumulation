//页面计算问题
function setRootSize() {
	function inner(){
		var deviceWidth = document.documentElement.clientWidth; 
		if(deviceWidth>640){deviceWidth = 640;}  
		document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
	}
	inner();
	window.addEventListener('resize', inner);
}
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
//左右滑动列表效果
//function listMoveLandR(boxid,sumid,_name){
//	var _box = $(boxid);
//	var _sum = _box.find(sumid);
//	var _arr = _sum.find(_name);
//	var _length = _arr.length;
//	var _index = 0;
//	var _move = _arr.eq(0).width();
//	var sumwidth = _move * (_length+1);
//	var _max = -_move * _length + _box.width();
//	var startX,startY,endX,endY,startPos,nowmove,starmove,_area;//定义判断变量
//	var a = _arr.find("a");
//	var offset = 0;
//
//	_box.css({"overflow":"hidden"});
//	_sum.css({"position":"relative"});
//
//	var _starsize = function(){
//		_move = _arr.eq(0).outerWidth(true);
//		sumwidth = _move * (_length);
//		_sum.width(sumwidth+2);
//		_max = -_move * _length + _box.width();
//		//_max = _max+parseFloat(_arr.css("margin-right") +1.2);
//		_index = 0;
//		_area = 0;
//		//console.log(a.parents().find(".sel").offset().left-_sum.offset().left);
//		//console.log(_sum.offset().left);
//		//console.log(a.parents().find(".sel").parents().index());
//		var length = a.parents().find(".sel").parents().index();
//		//console.log(length);
//
//		//console.log(offset)
//		_sum.css({"transform":"translate3d("+offset+"px, 0px, 0px)","-webkit-transform":"translate3d("+offset+"px, 0px, 0px)"});
//	};
//	_starsize();
//	$(window).resize(function(){ _starsize();});
//
//
//	var touchStart = function(event){
//		var touch = event.originalEvent.touches[0];
//		endX = 0;
//		endY = 0;
//		startPos = +new Date;
//		startX = touch.pageX;
//		startY = touch.pageY;
//		starmove = nowmove = offset;
//
//	};
//	var touchMove = function(event){
//		var touch = event.originalEvent.touches[0];
//		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
//		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
//		if(isScrolling === 0 && _box.width() < sumwidth){
//			event.preventDefault();//这里很重要！！！
//			endX = (startX-touch.pageX);
//			//endY = (startY-touch.pageY);
//			nowmove = starmove - endX;
//			if(nowmove >= 0){ nowmove = 0; }
//			if(nowmove < _max){ nowmove = _max;}
//			_sum.css({"transform":"translate3d("+nowmove+"px, 0px, 0px)","-webkit-transform":"translate3d("+nowmove+"px, 0px, 0px)"});
//		}
//	};
//	var touchEnd = function(event){
//		offset = nowmove;
//		var duration = +new Date - startPos;    // 滑动的持续时间
//		if (Number(duration) > 100){
//
//		}
//	};
//
//	_box.bind("touchstart",touchStart);
//	_box.bind("touchmove",touchMove);
//	_box.bind("touchend",touchEnd);
//}
function listMoveLandR(boxid,sumid,_name){
	var _box = $(boxid);
	var _sum = _box.find(sumid);
	var _arr = _sum.find(_name);
	var _length = _arr.length;
	var _index = 0;
	var _move = _arr.eq(0).width();
	var sumwidth = _move * (_length+1);
	var _max = -_move * _length + _box.width();
	var startX,startY,endX,endY,startPos,nowmove,starmove,_area;//定义判断变量
	var a = _arr.find("a");
	var offset = 0;

	_box.css({"overflow":"hidden"});
	_sum.css({"position":"relative"});

	var _starsize = function(){
		_move = _arr.eq(0).outerWidth(true);
		sumwidth = _move * (_length);
		_sum.width(sumwidth+2);
		_max = -_move * _length + _box.width();
		_index = 0;
		_area = 0;
		//console.log(a.parents().find(".sel").offset().left-_sum.offset().left);
		//console.log(_sum.offset().left);
		//console.log(a.parents().find(".sel").parents().index());
		var length = a.parents().find(".sel").parents().index();
		//console.log(length);

		console.log(offset)
		_sum.css({"transform":"translate3d("+offset+"px, 0px, 0px)","-webkit-transform":"translate3d("+offset+"px, 0px, 0px)"});
	};
	_starsize();
	$(window).resize(function(){ _starsize(); });


	var touchStart = function(event){
		var touch = event.originalEvent.touches[0];
		endX = 0;
		endY = 0;
		startPos = +new Date;
		startX = touch.pageX;
		startY = touch.pageY;
		starmove = nowmove = offset;

	};
	var touchMove = function(event){
		var touch = event.originalEvent.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0 && _box.width() < sumwidth){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
			//endY = (startY-touch.pageY);
			nowmove = starmove - endX;
			if(nowmove >= 0){ nowmove = 0; }
			if(nowmove < _max){ nowmove = _max;}
			_sum.css({"transform":"translate3d("+nowmove+"px, 0px, 0px)","-webkit-transform":"translate3d("+nowmove+"px, 0px, 0px)"});
		}
	};
	var touchEnd = function(event){
		offset = nowmove;
		var duration = +new Date - startPos;    // 滑动的持续时间
		if (Number(duration) > 100){

		}
	};

	_box.bind("touchstart",touchStart);
	_box.bind("touchmove",touchMove);
	_box.bind("touchend",touchEnd);
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
//首页右边框去除
function borderRightRemove(owrap,oli){
	var wrap = $(owrap);
	var li = wrap.children(oli);
	li.last().css({"border-right":"0"});
}
//首页产品奇偶去右边距
function marginRightRemove(oli){
	var li = $(oli+":odd");
	li.css({"margin-right":"0"});
}
//搜索框点击效果
function search_box(){
	var btn = $(".about_header .search");
	var tit = $(".about_header .center span");
	var s_box = $(".search_box");
	btn.click(function(e){
		tit.add(btn).hide();
		s_box.animate({"margin-left":"1.2rem"});
		var ev =e||window.event;
		//标准
		ev.stopPropagation();
		//ie
		ev.cancelBubble = true;
	});
	$("body").click(function(e){
		var ev =e||window.event;
		if($(ev.target).attr("class")=="submit fr"||$(ev.target).attr("class")=="text fl")
		{return false;}
		s_box.animate({"margin-left":"6rem"});
		window.setTimeout(function(){tit.add(btn).show();},500);
	})
}
//菜单弹出层 开始
function showMenu(menubutID,but,menuwrapID,bgID,othermenuarr){
	var menubut = $("#"+menubutID),
		but = $("." + but),
		menuwrapID = $("#"+menuwrapID),
		bgID = $("."+bgID);
	menubut.click(function(){
		if(menubut.hasClass("sel")){
			$(this).removeClass("sel");
			menuwrapID.hide();
		}else{
			$(this).addClass("sel");
			menuwrapID.show();
		}
		closeOtherMenu(othermenuarr);
	});

	but.click(function(){
		menubut.removeClass("sel");
		menuwrapID.hide();
		closeOtherMenu(othermenuarr);
	});
	bgID.click(function(){
		menubut.removeClass("sel");
		but.removeClass("sel");
		menuwrapID.hide();
	});

	var touchStart = function(event){
		menubut.removeClass("sel");
		but.removeClass("sel");
		menuwrapID.hide();
	};
	bgID.bind("touchstart",touchStart);
}

function closeOtherMenu(othermenuarr){
	$.each(othermenuarr,function(key,value){
		$("#"+key).removeClass("sel");
		$("#"+value).hide();
		//console.log(0)
	});
}
//高度计算
function boxHeightAdd(boxid, _top) {

	var _box = $("#" + boxid);

	var _now, _height;
	var _nowheight = function () {
		_now = $(window).height();
		_height = _now - _top;
		_box.height(_height);
	};
	_nowheight();
	$(window).scroll(function () { _nowheight(); });
}
//menu三级导航
function Downmenu(boxid, _top) {
	$(".menubox ul li .a1").click(function(){
		$(this).toggleClass("sel");
		$(this).parent("li").siblings("li").find(".a1").removeClass("sel");
		$(this).siblings().find(".menu_list_list2").slideUp(200);
		$(this).siblings().slideToggle(200);
		$(this).parent("li").siblings("li").find("nav").slideUp(200);
		$(this).siblings(".menu_list_list").find(".a2").removeClass("sel");
	});
	$(".menu_list_list2").siblings().click(function(){
		$(this).toggleClass("sel");
		$(this).siblings().slideToggle(200);
		$(this).parent().siblings().children(".menu_list_list2").slideUp(200);
		$(this).parent().siblings().children(".a2").removeClass("sel");
	})
}
$(function(){
	$(window).on('scroll',function(){
		var st = $(document).scrollTop();
		if( st>0 ){
			$('#go-top').fadeIn(function(){
				$(this).removeClass('dn');
			});
		}else{
			$('#go-top').fadeOut(function(){
				$(this).addClass('dn');
			});
		}
	});
	$('#go-top .go').on('click',function(){
		$('html,body').animate({'scrollTop':0},500);
	});
});
//菜单弹出层 结束
//首页选项卡
function indexTab(){
	var btn = $(".related_pro .btn a");
	var con = $(".related_pro .pro_lists");
	btn.click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var _index = $(this).index();
		con.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//首页侧边栏效果
function index_aside(){
	var btn = $(".online_ser .words");
	var con = $(".index_aside .popup");
	btn.click(function(e){
		if(con.css("left")=="0px"){
			con.animate({"left":"-2.39rem"});
			var ev = e||window.event;
			//标准
			ev.stopPropagation();
			//ie
			ev.cancelBubble=true;
		}
		else{
			con.animate({"left":"0rem"});
		}
	})
	//$("body").click(function(e){
	//	var ev = e||window.event;
	//	console.log($("aside"));
	//	console.log($(ev.target));
	//	if($("aside").has(ev.target)){return false;}
	//	con.animate({"left":"0rem"});
	//})
}

$(function(){
	//搜索框点击效果
	search_box();
	//菜单下拉层
	showMenu("menu_but","layer_close","menu_layer","layer_bg",{});
	boxHeightAdd("all_height", 64);
	$(window).resize(function(){boxHeightAdd("all_height", 64)});
	Downmenu();
});