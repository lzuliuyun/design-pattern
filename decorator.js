// 定义：装饰者(decorator)模式能够在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责。
// 装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰者前面或者后面加上自己的行为以达到特定的目的。
// 与继承相比，装饰者是一种更轻便灵活的做法。

// 雷霆战机（吃道具的例子）
// 介绍：现在我们假设正在开发一个小游戏–雷霆战机，
// 最开始我们使用最渣的飞机，只能发射普通子弹；
// 吃一颗星，可以发射普通子弹和发射散弹 ；
// 再吃一颗，可以发射普通子弹和散弹和跟踪导弹。

// 一级飞机
let plane = {
  fire () {
    console.log('发射普通子弹');
  }
}

plane.fire();

// 二级飞机

let fire1 = plane.fire;
let shot = function () {
  console.log('发射散弹');
};

plane.fire = function () {
  fire1();
  shot();
};

plane.fire();

// 三级飞机
let fire2 = plane.fire;
let track = function() {
  console.log('发射跟踪导弹');
}

plane.fire = function() {
  fire2();
  track();
}

plane.fire();

// PS：这样给对象动态的增加职责的方式就没有改变对象自身，一个对象放入另一个对象就形成了一条装饰链（一个聚合对象）， 而上面的shot和track也就是装饰者、装饰函数 ，当函数执行时，会把请求转给链中的下一个对象。


// 在 FUNCTION 原型上封装通用的装饰函数
Function.prototype.before = function (beforefn) {
  let self = this;
  return function () {
    beforefn.apply(this, arguments);
    return self.apply(this, arguments);
  }
};


Function.prototype.after = function(afterfn) {
  let self = this;
  return function() {
    let ret = afterfn.apply(this, arguments);
    self.apply(this, arguments);
    return ret;
  }
}

// 封装成单独函数（不污染原型）
let before = function(fn, before) {
  return function() {
    before.apply(this, arguments);
    return fn.apply(this, arguments);
  }
};

// before(fun1, fun2);

let after = function(fn, after) {
  return function() {
    let ret = fn.apply(this, arguments);
    after.apply(this, arguments);
    return ret;
  }
}

// after(fun1, fun2);

