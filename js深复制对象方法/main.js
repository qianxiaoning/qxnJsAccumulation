//复制一个对象及对象属性内的数组和对象时
//对象深复制法deepCopy()通过for in遍历全部复制全部对象属性或 构造函数法function A()（对象创造器）,var a=new A(),通过构造函数得到一个新对象，拥有构造函数的全部属性
//深复制方法
    function deepCopy(p, c) {
        //新对象c
        var c = c || {};
        //遍历老对象p中所有属性
        for (var i in p) {
            //如果此属性是个对象
            if (typeof p[i] === 'object') {
                //则此属性的原型指向constructor是Array则创建一个数组，原型指向constructor是Object则创建一个对象
                c[i] = (p[i].constructor === Array) ? [] : {};
                //递归一层方法，遍历数组或对象中的值或属性
                deepCopy(p[i], c[i]);
            } else {
                //直接复制属性到新对象
                c[i] = p[i];
            }
        }
        //遍历结束，返回c，即新对象
        return c;
    }