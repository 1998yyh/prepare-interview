/**
 * 实现一台咖啡机
 */
class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = 'init';
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if (state === 'american') {
      // 这里用 console 代指咖啡制作流程的业务逻辑
      console.log('我只吐黑咖啡');
    } else if (state === 'latte') {
      console.log(`给黑咖啡加点奶`);
    } else if (state === 'vanillaLatte') {
      console.log('黑咖啡加点奶再加香草糖浆');
    } else if (state === 'mocha') {
      console.log('黑咖啡加点奶再加点巧克力');
    }
  }
}

// 首先我们发现 changeState 它好好管好自己的事（状态切换）不行吗？怎么连做咖啡的过程也写在这里面？

class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = 'init';
  }
  changeState(state) {
    // 记录当前状态
    this.state = state;
    if(state === 'american') {
      // 这里用 console 代指咖啡制作流程的业务逻辑
      this.americanProcess();
    } else if(state === 'latte') {
      this.latteProcress();
    } else if(state === 'vanillaLatte') {
      this.vanillaLatteProcress();
    } else if(state === 'mocha') {
      this.mochaProcress();
    }
  }
  
  americanProcess() {
    console.log('我只吐黑咖啡');    
  }
  
  latteProcress() {
    this.americanProcess();
    console.log('加点奶');  
  }
  
  vanillaLatteProcress() {
    this.latteProcress();
    console.log('再加香草糖浆');
  }
  
  mochaProcress() {
    this.latteProcress();
    console.log('再加巧克力');
  }
}

const mk = new CoffeeMaker();
mk.changeState('latte');


// 开放封闭
// 复用的问题解决了，if-else 却仍然活得好好的。
// 现在咱们假如要增加”气泡美式“这个咖啡品种，就不得不去修改 changeState 的函数逻辑，这违反了开放封闭的原则。


class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = 'init';
    // 初始化牛奶的存储量
    this.leftMilk = '500ml';
  }
  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log('咖啡机现在的牛奶存储量是:', this.that.leftMilk)
      console.log('我只吐黑咖啡');
    },
    latte() {
      this.american()
      console.log('加点奶');
    },
    vanillaLatte() {
      this.latte();
      console.log('再加香草糖浆');
    },
    mocha() {
      this.latte();
      console.log('再加巧克力');
    }
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState('latte');