/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  const dummy = new ListNode();
  dummy.next = head;
  const cur = dummy;


  while(dummy){
    if(dummy.next && dummy.next.val === val){
      dummy.next = dummy.next.next;
    }
    dummy = dummy.next
  }

  return dummy.next
};