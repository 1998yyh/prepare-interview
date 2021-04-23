/**
 * 
 * @param {*} tag 
 * @param {*} originPrice 
 * @returns 
 * 
 * 当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
 * 当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
 * 当价格类型为“返场价”时，满 200 - 50，不叠加
 * 当价格类型为“尝鲜价”时，直接打 5 折
 */

// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {

  // 处理预热价
  if (tag === 'pre') {
    if (originPrice >= 100) {
      return originPrice - 20
    }
    return originPrice * 0.9
  }

  // 处理大促价
  if (tag === 'onSale') {
    if (originPrice >= 100) {
      return originPrice - 30
    }
    return originPrice * 0.8
  }

  // 处理返场价
  if (tag === 'back') {
    if (originPrice >= 200) {
      return originPrice - 50
    }
    return originPrice
  }

  // 处理尝鲜价
  if (tag === 'fresh') {
    return originPrice * 0.5
  }
}

// 问题 ：
// 1. if-else堆积太多 违背单一功能
// 2. 违背开放封闭原则 如果添加一个新的价 需要修改原有逻辑

// 改造

// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};

// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice)
}

// 如果 新人价，只需要给 priceProcessor 新增一个映射关系：
priceProcessor.newUser = function (originPrice) {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
}