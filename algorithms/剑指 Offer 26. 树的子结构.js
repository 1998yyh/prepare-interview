// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

// B是A的子结构， 即 A中有出现和B相同的结构和节点值。

var isSubStructure = function(A, B) {
  if(!A || !B){
    return false
  }
  return isSmapTree(A,B) || isSubStructure(A.left,B) || isSubStructure(A.right,B)
};


function isSmapTree(A,B){
  if(!B){
    return true;
  }

  if(!A){
    return false
  }

  if(A.val !== B.val){
    return false
  }

  return isSmapTree(A.left,B.left) && isSmapTree(A.right,B.right)

}