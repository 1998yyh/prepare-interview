export default function(tag,data,children,text,elm){
  const key = data.key;
  return {
    tag,
    data,
    children,
    text,
    elm,
    key
  };
}
/* 
  a)在不使用vue、react的前提下写代码解决一下问题
    一个List页面上，含有1000个条目的待办列表，现其中100项在同一时间达到了过期时间，需要在对应项的text-node里添加“已过期”文字。需要尽可能减少dom重绘次数以提升性能。
  b)尝试使用vue或react解决上述问题
*/