// 给你链表的头节点 head 和一个整数 k 。

// 交换 链表正数第 k 个节点和倒数第 k 个节点的值后，返回链表的头节点（链表 从 1 开始索引）。

// 输入：head = [1,2,3,4,5], k = 2
// 输出：[1,4,3,2,5]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  const dummy = new ListNode();
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }

  // 此时已经找到了 第k个节点 

  const node1 = fast;
  // 等fast没有了 slow则是倒数第k个节点
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  // 交换
  [node1.val, slow.val] = [slow.val, node1.val]
  return dummy.next
};