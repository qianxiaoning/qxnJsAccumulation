//lm_pic鼠标跟随
lm_picMouseMove();

//lm_pic鼠标跟随
function lm_picMouseMove(){
    var target = $('.lm_pic');
    var pic1 = $('.loginPic01');
    var pic2 = $('.loginPic02');
    var pic3 = $('.loginPic03');
    var positionX = 0;
    var positionY = 0;
    target.mousemove(function(e) {
        var x = e.clientX, y = e.clientY;
        if(positionX === 0 && positionY === 0){
            positionX = x;
            positionY = y;
        }
        var time = '800';
        if(x > positionX && y < positionY){
            //console.log(1);
            pic1.stop().animate({'left':0,'bottom':50},time,"easeOutCubic");
            pic2.stop().animate({'left':180,'top':37},time,"easeOutCubic");
            pic3.stop().animate({'left':55,'top':126},time,"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x > positionX && y > positionY){
            //console.log(2);
            pic1.stop().animate({'left':10,'bottom':40},time,"easeOutCubic");
            pic2.stop().animate({'left':170,'top':47},time,"easeOutCubic");
            pic3.stop().animate({'left':45,'top':116},time,"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x < positionX && y < positionY){
            //console.log(3);
            pic1.stop().animate({'left':-10,'bottom':40},time,"easeOutCubic");
            pic2.stop().animate({'left':190,'top':47},time,"easeOutCubic");
            pic3.stop().animate({'left':65,'top':116},time,"easeOutCubic");
            positionX = x;
            positionY = y;
        }else if(x < positionX && y > positionY){
            //console.log(4);
            pic1.stop().animate({'left':0,'bottom':30},time,"easeOutCubic");
            pic2.stop().animate({'left':180,'top':57},time,"easeOutCubic");
            pic3.stop().animate({'left':55,'top':106},time,"easeOutCubic");
            positionX = x;
            positionY = y;
        }

    });
    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
}