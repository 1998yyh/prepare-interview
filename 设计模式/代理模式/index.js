// 规定礼物的数据结构由type和value组成
const present = {
  type: '巧克力',
  value: 60,
}

// 为用户增开presents字段存储礼物
const girl = {
  // 姓名
  name: '小美',
  // 自我介绍
  aboutMe: '...', //（大家自行脑补吧）
  // 年龄
  age: 24,
  // 职业
  career: 'teacher',
  // 假头像
  fakeAvatar: 'xxxx', //(新垣结衣的图片地址）
  // 真实头像
  avatar: 'xxxx', //(自己的照片地址),
  // 手机号
  phone: 123456,
  // 礼物数组
  presents: [],
  // 拒收50块以下的礼物
  bottomValue: 50,
  // 记录最近一次收到的礼物
  lastPresent: present,
}

// 掘金婚介所推出了小礼物功能
const JuejinLovers = new Proxy(girl, {
  get: function (girl, key) {
    if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
      alert('您还没有完成验证哦')
      return
    }

    //...(此处省略其它有的没的各种校验逻辑)

    // 此处我们认为只有验证过的用户才可以购买VIP
    if (user.isValidated && privateInfo.indexOf(key) !== -1 && !user.isVIP) {
      alert('只有VIP才可以查看该信息哦')
      return
    }
  },
  set: function (girl, key, val) {
    // 最近一次送来的礼物会尝试赋值给lastPresent字段
    if (key === 'lastPresent') {
      if (val.value < girl.bottomValue) {
        alert('sorry，您的礼物被拒收了')
        return
      }
      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl.lastPresent = val
      girl.presents = [...girl.presents, val]
    }
  }

})