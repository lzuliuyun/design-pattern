// 定义：桥接模式（Bridge）将抽象部分与它的实现部分分离，使它们都可以独立地变化。
// 使用场景：事件回调函数、请求接口之间进行桥接、用于连接公开的API代码和私用实现的代码
// 根据javascript语言的特点，我们将其简化成2个角色：
// （1）扩充抽象类
// （2）具体实现类


// 最简单的桥接模式
// 参考iterator模式
let each = function(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    callback(array[i], array[i], i);
  }
};

each([1, 2, 3, 4], function(val, index) {
  console.log("val:" + val + ", index:" + index);
});

// PS：在这个例子中，抽象部分是each函数，也就是上面说的扩充抽象类，实现部分是fn，即具体实现类。抽象部分和实现部分可以独立的进行变化。这个例子虽然简单，但就是一个典型的桥接模式的应用。


// 事件监控
function getBeerByID(id, callback) {
  asyncRequest('GET', 'beer.uri?id=' + id, function(res) {
    callback(res.responseText);
  })
};

addEventListener(element, 'click', getBeerByBridge);
function getBeerByBridge(e) {
  getBeerByID(this.id, function (beer) {
    console.log('Requested Beer: ' + beer);
  })
};

// PS：这里的getBeerByIdBridge就是我们定义的桥，用于将抽象的click事件和getBeerById连接起来，同时将事件源的ID，以及自定义的call函数（console.log输出）作为参数传入到getBeerById函数里。


// 用于连接公开的API代码和私用实现的代码
let Public = function() {
  let secret = 3;
  this.privilegedGetter = function() {
    return secret;
  }
};

let public = new Public();
let data = public.privilegedGetter();
// PS：如果一个公用的接口抽象了一些也许应该属于私用性的较复杂的任务，那么可以使用桥接模式来收集某些私用性的信息。可以用一些具有特殊权利的方法作为桥梁以便访问私用变量空间。这一特例中的桥接性函数又称特权函数。

// 用桥接模式联结多个类
let Class1 = function(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
};

let Class2 = function(d) {
  this.d = d;
};

let BridgeClass = function(a, b, c, d) {
  this.one = new Class1(a, b, c);
  this.two = new Class2(d);
};

// PS：这看起来很像是—-适配器，的确如此。但要注意到本例中实际上并没有客户系统要求提供数据。它只不过是用来接纳大量数据并将其发送给责任方的一种辅助性手段。此外，BridgeClass也不是一个客户系统已经实现的现有接口。引入这个类的目的只不过是要桥接一些类而已。