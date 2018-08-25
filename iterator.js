// 定义：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
// 使用的好处：迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

// 内部迭代器
// 定义：迭代函数内部已经定义好了迭代原则，它完全接手整个迭代过程，外部只需要一次初始调用。
let each = function(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    callback(array[i], array[i], i);
  }
};

each([1, 2, 3, 4], function(val, index) {
  console.log("val:" + val + ", index:" + index);
});

// 外部迭代器
// 定义：外部迭代器必须显式地请求迭代下一个元素，外部迭代器增加了一些调用的复杂度，但相对的也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。
let Iterator = function(obj) {
  let current = 0;
  let next = function() {
    current++;
  };
  let isDone = function() {
    return current >= obj.length;
  };

  let getCurItem = function() {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurItem: getCurItem
  };
};

// 判断两个数组是不是相等
var compare = function(iterator1, iterator2) {
  while (iterator1.isDone() && iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error("iterator1 和 iterator2不相等");
    }
    iterator1.next();
    iterator2.next();
  }
  console.log("iterator1 和 iterator2相等");
};
var iterator1 = Iterator([1, 2, 3, 4]);
var iterator2 = Iterator([1, 2, 3, 4]);
compare(iterator1, iterator2);

// 中止迭代器
let each2 = function(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(array[i], array[i], i) === false) {
      break;
    }
  }
};

// 迭代器应用示例
// 需求：根据不同的浏览器获取相应的上传组件对象，将不同的上传对象封装到各自的函数里; 如果函数可用，则返回该对象，否则返回false，提示迭代器继续向下迭代。
// 将不同的上传对象封装到各自的函数里; 如果函数可用，则返回该对象，否则返回false，提示迭代器继续
let getActiveUploadObj = function() {
  try {
    return new ActiceXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (e) {
    return false;
  }
};
let getFlashUploadObj = function() {
  if (supportFlash()) {
    let str = "<object type='application/x-shockwave-flash'></object>";
    return $(str).appendTo($("body"));
  }
  return false;
};
let getFormUpl0adObj = function() {
  let str = "<input type='file' type='file' class='ui-file' />"; // 表单上传
  return $(str).appendTo($("body"));
};

//迭代器代码
let iteratorUploadObj = function() {
  for (let i = 0, fn; (fn = arguments[i++]); ) {
    let uploadObj = fn();
    if (uploadObj !== false) {
      return uploadObj;
    }
  }
};
let uploadObj = iteratorUploadObj(
  getActiveUploadObj,
  getFlashUploadObj,
  getFormUpl0adObj
);
