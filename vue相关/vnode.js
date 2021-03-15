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