//例子一
success:function(data){
                // console.log(data);
                //获取数据，重新初始化
                var equip = $(".inner_wrap").eq(roomIndex).find(".equip");
                for(var i=0;i<data[0].cellList.length;i++){


                    data[0].cellList[i].commandNum=="01"?equip.eq(i).addClass("sel"):equip.eq(i).removeClass("sel");


                }
                //去遮罩
                $(".iconfont_layer.b").eq(roomIndex).hide();
            }


//例子二
'<i class="iconfont icon-hekricon01 equip'+(cell.commandNum=="01"?" sel":"")+'"></i>'
