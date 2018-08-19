// 单例模式
// 单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
// 在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
// 举例：模态框、登录控件、注销控件

// 1.引入代理实现单例模式
var CreateDiv = function(html) {
  this.html = html;
  this.init();
}

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}

var ProxySingleCreateDiv = (function() {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }

    return instance;
  }
})()

var a = new ProxySingleCreateDiv('seven1');
var b = new ProxySingleCreateDiv('seven2');

// 通用的单例模式
