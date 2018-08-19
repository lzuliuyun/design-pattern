// 策略模式
// 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
// 举例：表单效验（是否为空、长度、手机号、邮箱等等）
// 计算年终奖（工资、效绩）
// 下面以年终将做说明：
// 比如公司的年终奖是根据员工的工资和绩效来考核的，绩效为A的人，年终奖为工资的4倍，
// 绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍；

const Bouns = {
  A (salary) {
    return salary * 4;
  },
  B (salary) {
    return salary * 3;
  },
  C (salary) {
    return salary * 2;
  }
}

Object.freeze(Bouns);

const calculateBouns = function(type, salary) {
  return Bouns[type](salary);
}

console.log(calculateBouns('A', 10000));
console.log(calculateBouns('B', 30000));

// 策略模式指的是定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，
// 实际就是将算法的使用和实现分离出来；算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数，
// 而算法的实现是根据绩效对应不同的绩效规则；
// 一个基于策略模式的程序至少由2部分组成，第一个部分是一组策略类，策略类封装了具体的算法，
// 并负责具体的计算过程。第二个部分是环境类Context，该Context接收客户端的请求，
// 随后把请求委托给某一个策略类。
// 复合开放-封闭原则，可变的部分为策略类（一组算法），不变的部分为执行具体算法的方式。


// 表单验证
const strategys = {
  isNotEmpty(value, errMsg) {
    if (value === '') return errMsg;
  },
  minLength (value, errMsg, length) {
    if (value.length < length) {
      return errMsg;
    }
  },
  mobileFormat (value, errMsg) {
    if(!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errMsg;
    }
  }
}

Object.freeze(strategys);

var Validator = function() {
  this.cache = [];
};

Validator.prototype.add = function(dom, rules) {
  var self = this;
  for(var i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      var strategyArr = rule.strategy.split(':');
      var errMsg = rule.errMsg;
      self.cache.push(function() {
        var strategy = strategyArr.shift();
        strategyArr.unshift(dom.value);
        strategyArr.push(errMsg);
        return strategys[strategy].apply(dom, strategyArr);
      });
    })(rule)
  }
}

Validator.prototype.validate = function() {
  for(var i=0, validatorFunc; validatorFunc = this.cache[i++];) {
    var msg = validatorFunc();
    if (msg) {
      return msg;
    }
  }
}

var registerForm = document.getElementById('regiserForm');
var validatorFunc = function() {
  var validator = new Validator();

  validator.add(registerForm.userName, [
    {strategy: 'isNotEmpty', 'errMsg': '用户名不能为空'},
    {strategy: 'minLength:6', errMsg:'用户名长度不能小于6位'}
  ]);

  validator.add(registerForm.password, [
		{strategy: 'minLength:6', errMsg: '密码长度不能小于6位'},
  ]);

	validator.add(registerForm.phoneNumber, [
		{strategy: 'mobileFormat', errMsg: '手机号格式不正确'},
  ]);

  var errorMsg = validator.validate(); // 获得效验结果
	return errorMsg; // 返回效验结果
}


registerForm.onsubmit = function() {
  var errMsg = validatorFunc();
  if (errMsg) {
    alert(errMsg);
    return false;
  }
}