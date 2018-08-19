// 工厂模式
// 定义：简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些类通常都拥有相同的接口（属性和方法）。
// 举例：计算器（加、减、乘、除）
// 自行车售卖（山地、公路）
// 饮料机（咖啡、牛奶、水）
// RPG中职业（战士、法师、射手）

// 什么时候使用工厂模式
// 对象的构建十分复杂
// 需要依赖具体环境创建不同实例
// 处理大量具有相同属性的小对象


function Warrior() {
  this.skill = '回血'
  this.blood = 150;
  this.hit = 8;

  console.log(this);
}

function Mage() {
  this.skill = '冰冻';
  this.blood = 120;
  this.hit = 3;
  console.log(this);
}

function Archer() {
  this.skill = '消耗';
  this.blood = 110;
  this.hit = 10;
  console.log(this);
}

const RoleFactory = {
  createRole (role) {
    let roler;

    switch(role) {
      case '战士':
        roler = new Warrior();
        break;
      case '法师':
        roler = new Mage();
        break;
      case '射手':
        roler = new Archer();
        break;
      default:
        roler = new Warrior();
    }
  }
}

// 是否需要这个
Object.freeze(RoleFactory);

var warrior = RoleFactory.createRole('战士');
var mage = RoleFactory.createRole('法师');
var archer = RoleFactory.createRole('射手');