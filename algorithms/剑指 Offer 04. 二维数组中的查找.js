// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var findNumberIn2DArray = function (matrix, target) {
  let i = matrix.length - 1;
  let j = 0;
  while(i >= 0 && j <= matrix[i].length - 1){
    console.log(i,j);
    if(matrix[i][j] > target) i--
    else if(matrix[i][j] < target) j ++
    else return true
  }

  return false
};

const a = findNumberIn2DArray(
  [
    [-5]
  ],-5
)

console.log(a);