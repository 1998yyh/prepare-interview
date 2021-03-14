// AST最终返回的是一个类似h函数的结构
// vue底层就是将模板转化成字符串,通过正则等方式拆分,组装成ast树结构

export default function (templateString) {
  const len = templateString.length;
  let index = 0;
  let rest = '';
  // 检测开始标签的正则
  const startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 检测结束标签的正则
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 检测到结束标签前文本正则  
  const textRexExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
  // 检测空字符串正则
  const gapRexExp = /\s+/;
  // 栈结构缓存标签
  const stack1 = [];
  const stack2 = [{
    children: []
  }];
  while (index < len - 1) {
    rest = templateString.substring(index);

    if (startRegExp.test(rest)) {
      // 识别是否是开始标签
      let tag = rest.match(startRegExp)[1];
      let attrs = rest.match(startRegExp)[2];
      const len = attrs !== undefined ? attrs.length : 0;
      // 入栈
      stack1.push(tag);
      stack2.push({
        tag,
        children: [],
        attrs:parseAttrs(attrs)
      });
      index += tag.length + 2 + len;
    } else if (endRegExp.test(rest)) {
      // 识别是否是结束标签
      let tag = rest.match(endRegExp)[1];
      const pop_tag = stack1.pop();
      // 出栈
      if (tag === pop_tag) {
        // stack1.pop();
        const pop_arr = stack2.pop();
        stack2[stack2.length - 1].children.push(pop_arr);
      } else {
        throw Error('出错了');
      }
      index += tag.length + 3;
    } else if (textRexExp.test(rest)) {
      // 检测文本
      let tag = rest.match(textRexExp)[1];
      // 是否不是空文本
      if (!gapRexExp.test(tag)) {
        stack2[stack2.length - 1].children.push({
          text: tag,
          type: 3
        });
      }
      index += tag.length;
    } else {
      index++;
    }
  }

  return stack2[0].children[0];
}

function parseAttrs(attrsString) {
  if(!attrsString) return undefined;
  // 截取起始点
  let point = 0;
  // 是否再引号内部
  let isInQuote = false;
  // 结果
  let result = [];
  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if ( char=== '"') {
      isInQuote = !isInQuote;
    }else if(!isInQuote && char===' '){
      // 筛选出纯空格
      if(!/^\s*$/.test(attrsString.substring(point,i))){
        result.push(attrsString.substring(point,i));
      }
      point = i;
    }
  }

  result.push(attrsString.substring(point));
  return result.reduce((pre,cur)=>{
    const arr = cur.trim().split('=');
    pre.push({name:arr[0],value:arr[1]});
    return pre;
  },[]);
}