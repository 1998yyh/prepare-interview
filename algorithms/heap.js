// 什么是堆
/**
 *
满足下面两个条件的就是堆：

堆是一个完全二叉树
堆上的任意节点值都必须大于等于（大顶堆）或小于等于（小顶堆）其左右子节点值
如果堆上的任意节点都大于等于子节点值，则称为 大顶堆

如果堆上的任意节点都小于等于子节点值，则称为 小顶堆

也就是说，在大顶堆中，根节点是堆中最大的元素；
 * 
 */
// 怎样建堆
function Heap(params) {
  let items = []

}
// 插入式创建：每次插入一个节点，实现一个大顶堆（或小顶堆）
// 将节点插入到队尾
// 自下往上堆化： 将插入节点与其父节点比较，如果插入节点大于父节点（大顶堆）或插入节点小于父节点（小顶堆），则插入节点与父节点调整位置
// 一直重复上一步，直到不需要交换或交换到根节点，此时插入完成。
let items = [6,5,4,1,3,2]

function insert(key) {
  items.push(key);
  console.log('items',items)
  let i = items.length - 1;
  while (i / 2 > 0 && items[i] > items[i / 2]) {
    swap(items, i, i / 2);
    i = i / 2
  }
}

function swap(items,i,j) {
  [items[i],items[j]] = [items[j],items[i]]
}


insert(8)

console.log('arr',items)
// 原地创建：又称堆化，给定一组节点，实现一个大顶堆（或小顶堆）
// 堆排序
// 内存堆与垃圾回收
// Top K 问题
// 中位数问题