// 定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。
// 代理对象和本体对象实现了同样的接口，并且会把任何方法调用传递给本体对象；
// 举例：
// 图片预加载、图片懒加载、
// 合并HTTP请求（代理收集一定时间内的所有HTTP请求，然后一次性发给服务器）、
// 惰性加载（通过代理处理和收集一些基本操作，然后仅在真正需要本体的时候才加载本体）、
// 缓存代理（缓存请求结果、计算结果）

// 缓存代理
const mult = function(...args) {
  return args.reduce(function(total, cur) {
    return total * cur;
  }, 1)
}

const plus = function(...args) {
  return args.reduce(function(total, cur) {
    return total + cur;
  }, 0)
}

const proxyFactory = function(fn) {
  let cache = {};
  return function (...args) {
    let argsKey = args.join(',');
    if(argsKey in cache) {
      return cache[args];
    } else {
      return cache[argsKey] = fn.apply(this, arguments);
    }
  }
}

const proxyMult = proxyFactory(mult);
const proxyPlus = proxyFactory(plus);
console.log(proxyMult(1,2,3,4), proxyPlus(1,2,3,4));

// 虚拟代理
// 虚拟代理：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建
// 例：使用虚拟代理实现图片懒加载
const imgFun = (function() {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  }
})();

const proxyImage = (function () {
  const img = new Image();
  img.onload = function() {
    imgFun.setSrc(this.src);
  };

  return  {
    setSrc: function(src) {
      imgFun.setSrc('./loading.gif');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('./reality.png');

// PS：图片懒加载的方式：先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面。
// 这里讲述一下代理对象做了那些事：
// 1.创建了一个 Image 对象，并为其绑定了 onload 事件。
// 2.将 imgNode 先设置为 ‘./loading.gif’ 加载的菊花图。
// 3.当 Image 对象加载完真实的图片，也就是上文的 ‘./reality.png’ ,将 imgNode 设置为 ‘./reality.png’。