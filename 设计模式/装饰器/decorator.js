// 具体的参数意义，在下个小节，这里大家先感知一下操作
function funcDecorator(target, name, descriptor) {
  console.log('target',target)
  console.log('name',name)
  console.log('descriptor',descriptor)
  let originalMethod = descriptor.value
  descriptor.value = function() {
  console.log('我是Func的装饰器逻辑')
  return originalMethod.apply(this, arguments)
}
return descriptor
}

class Button {
  @funcDecorator
  onClick() { 
      console.log('我是Func的原有逻辑')
  }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()