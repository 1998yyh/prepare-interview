// https://juejin.cn/post/6933111691215372302#heading-14

function fn(node){
  const arr = [];
  return arr.reduce((pre,cur)=>{
    // 找到对应的templateValues
    const itemList  = map[item] 
    // 如果存在
    if(itemList && itemList.length){
      const curData = itemList.find(item=>item.mcc_code === node.code);
      pre[cur] = curData ? curData.mcc_value:'unblock'
    }
    return pre
  },{})
}