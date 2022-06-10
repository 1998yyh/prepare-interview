function intersection(arr1,arr2){

  const len1 = arr1.length;
  const len2 = arr2.length;

  const set  = new Set();
  const res = [];

  for(let i = 0;i<len1;i++){
    for(let j = 0;j<len2;j++){
      if(arr1[i] === arr2[j] && !set.has(j) ){
        set.add(j)
        res.push(arr1[i])
      }
    }
  }
  return res
}