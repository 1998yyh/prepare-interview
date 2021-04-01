// 排序
const list = [5, 4, 12, 37, 9, 1]

console.log(quickSort(list))
// 冒泡排序
function bubbleSort(list) {
  const _list = [...list]
  const len = list.length;
  let flag = true;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (_list[j] > _list[j + 1]) {
        flag = false;
        [_list[j], _list[j + 1]] = [_list[j + 1], _list[j]]
      }
    }
    if (flag) {
      return _list
    }
  }
  return _list
}


// 选择排序
function selectSort(list) {
  const _list = list;
  const len = _list.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i; j < len; j++) {
      if (_list[minIndex] > _list[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [_list[minIndex], _list[i]] = [_list[i], _list[minIndex]]
    }
  }
  return _list;
}

// 插入排序
function insertSort(list) {
  const _list = list;
  const len = _list.length;
  for (let i = 0; i < len; i++) {
    let j = i;
    let temp = _list[j]
    while (j > 0 && _list[j - 1] > temp) {
      _list[j] = _list[j - 1];
      j--;
    }

    _list[j] = temp;
  }

  return _list
}

// 归并排序
function mergeSort(list) {
  if (list.length <= 1) {
    return list
  }

  const len = list.length;
  const mid = Math.floor(len / 2)
  const left = mergeSort(list.slice(0, mid))
  const right = mergeSort(list.slice(mid))
  return mergeArr(left, right)
}

function mergeArr(list1, list2) {
  const len1 = list1.length;
  const len2 = list2.length;
  let i = 0;
  let j = 0;
  let result = [];

  while (len1 > i && len2 > j) {
    if (list1[i] < list2[j]) {
      result.push(list1[i])
      i++
    } else {
      result.push(list2[j])
      j++
    }
  }

  if (len1 > i) {
    return result.concat(list1.slice(i))
  } else {
    return result.concat(list2.slice(j))
  }
}

// 快速排序
function quickSort(nums,left = 0,right = nums.length - 1) {
  if(nums.length > 1){
      let lineIndex  = partition(nums,left,right);
      if(left < lineIndex - 1 ){
        quickSort(nums,left,lineIndex - 1)
      }

      if(lineIndex < right){
        quickSort(nums,lineIndex,right)
      }
  }

  return nums;
}

function partition(arr, left, right) {
  // 选取中间点
  let pivotValue = arr[Math.floor(left + (right - left) / 2)]
  let i = left;
  let j = right;
  while (i < j) {
    while (arr[i] < pivotValue) {
      i++
    }

    while (arr[j] > pivotValue) {
      j--
    }

    if (i <= j) {
      swap(arr,i,j);
      i++;
      j--;
    }
  }

  return i
}

function swap(arr,i,j){
  [arr[i],arr[j]] = [arr[j],arr[i]]
}