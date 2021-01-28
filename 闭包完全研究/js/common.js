//多功能树
function multi_function_tree(){
    //tree
    var tree = $(".container .left .tree");
    //第一步获取ajax数据，保存下来
    //楼层部门数据
    function getFloorDepartData(callback) {
        $.ajax({
            url: 'json/findFloorTree.jsp',
            data: null,
            dataType: 'json',
            type: 'post',
            error: function () {
                console.log("ajax调用失败")
            },
            success: function (res) {
                callback(res);
                tree.text(JSON.stringify(res));
            }
        });
    };
    //闭包获取回调函数的值到别的函数中
    getFloorDepartData(function(res){
        //console.log(res)
        return(res);
    });

    //console.log(getFloorDepartData());
    //部门数据
    function getDepartData(){
        $.ajax({
            url:'json/findDepartTree.jsp',
            data:null,
            dataType:'json',
            type:'post',
            error:function(){console.log("ajax调用失败")},
            success:function(res){
                //console.log(res);
                var result = tree.text(JSON.stringify(res));
                return result;
            }
        });
    }
    //闭包方式一
    //select时把getFloorDepartData函数作为参数传进去，形成闭包，接着进行回调函数
    //闭包方式二
    //把getDepartData得到的值，用return返回回来，调用函数名，得到结果
    //select事件
    function select(callback){
        var select = $(".select");
        select.change(function(){
            //方法一
            callback();
            //方法二
            getDepartData();
        })
    };
    select(getFloorDepartData)
}
//作用域试验
//跨二级
function scope(){
    var num=1;
    function a(callback) {
        num=2;
        function c(callback){
            num=4;
            //b的位置实施，b获取到想要的c函数里的值
            callback();
        };
        // function b(){
        //    console.log(num);
        // };
        //而二。再把b作为参数传到c里去
        c(callback);
    };
    function b(){
        console.log(num);
    };
    //一。把b作为参数传到a里去
    a(b);
}
//跨三级 return值方法
function scope1(){
    function a() {
        function c() {
            function d() {
                //function d里有个值
                var myValue = '宝藏';
                return myValue;
            }
            //console.log(d());
            return d();
        }
        //c();
        //console.log(c());
        return c();
    }
    //a()
    //console.log(a())
    function b() {
        //我function b要获取function d里面的变量
        console.log(a());
    }
    b();
}
//我感觉return 是把返回值一级级返回出去

//跨三级 函数参数闭包
function scope1_1(){
    var my;
    function a(tool) {
        function c(tool) {
            function d(tool) {
                //宝藏
                my = 'treasure';
                //在这里执行
                tool();
            }
            d(tool);
        }
        c(tool);
    }
    function b() {
        //我function b要获取function d里面的变量
        //我要把function b作为参数一级级传进去
        //测值
        console.log(my)
    }
    //调用
    a(b);
}
//同步作用域测试
function syn0(){
    var i=0;
    function a(){
        i=1;
    }
    a()
    console.log(i);
}
function syn1(){
    var i=0;
    function a(){
        var i=1;
    }
    a()
    console.log(i);
}
//小结 同步的话 只有外面一个var 里面变量改变了，变量就是改变了，外部也能获取到。如果里外都有var 会默认问两个不同变量，里面值变化影响不到外面，获取的仍是外面那个i的值
//异步的话 就算是一个变量，里面那个没有var，里面异步的值也是传不到外面的，因为异步要时间

//js变量作用域总结 外变里直接取。里变同步同一个变量外直接取，里变同步不同变量外取的是外的那个值。里变异步外取不到，只能用闭包把函数传进来。

//以下是ajax测试闭包
function ajax0(callback){
    $.ajax({
        url:'json/findDepartTree.jsp',
        data:null,
        dataType:'json',
        type:'post',
        error:function(){console.log("ajax调用失败")},
        success:function(res){
            //callback(res);
            treasure = res;
            callback();
        },
    });
}
//另一种方法
function ajax1(callback){
    $.ajax({
        url:'json/findDepartTree.jsp',
        data:null,
        dataType:'json',
        type:'post',
        error:function(){console.log("ajax调用失败")},
        success:function(res){
            callback(res);
        },
    });
}
//get值的地方
function get0(){
    console.log(treasure);
}
function get1(res){
    console.log(res);
}
$(function(){
    //ajax尝试传到全局变量
    ajax0(get0);
    //ajax尝试传到全局变量
    ajax1(get1);
    //同步作用域测试
    //syn0();
    //syn1();
});
