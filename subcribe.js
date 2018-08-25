let Event = (function() {
  let list = {};
  let listen;
  let trigger;
  let remove;

  listen = function(key, fn) {
    if (!(key in list)) {
      list[key] = [];
    }

    list[key].push(fn);
  };

  trigger = function() {
    let key = [].shift.call(arguments);
    let fns = list[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    fns.forEach(fn => {
      fn.apply(this, arguments);
    });
  };

  remove = function(key, fn) {
    let fns = list[key];
    if (!fns || fns.length === 0) {
      return false;
    }

    if (!fn) {
      fns && (fns.length = 0);
    } else {
      fns = fns.filter(curFn => {
        return curFn !== fn;
      });
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  };
})();

// 测试代码
function d1() {
  console.log("我是第一个color监听的函数!");
}
function d2() {
  console.log("我是第二个color监听的函数!");
}
// 测试代码
Event.listen("color", d1); // 在 list['color'] 中绑定 d1 函数
Event.listen("color", d2); // 在 list['color'] 中绑定 d2 函数
// Event.remove("color", d1); // 在 list['color'] 中移除 d1 函数
Event.trigger("color"); // 我是第二个color监听的函数!
