// 链表

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}


// 合并两个有序链表
function mergeTwoLists(L1, L2) {
  // 创建一个头结点
  const dummy = new ListNode();
  let cur = dummy;
  while (L1 && L2) {
    if (L1.val > L2.val) {
      cur.next = L2;
      L2 = L2.next;
    } else {
      cur.next = L1;
      L1 = L1.next;
    }
    cur = cur.next;
  }
  if (L1) {
    cur.next = L1;
  }
  if (L2) {
    cur.next = L2;
  }
  return dummy.next;
}

// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

function deleteDuplicates(list) {
  let cur = list;

  while (cur) {
    if (cur.val === cur.next.val) {
      cur.next = cue.next.next;
    }
    cur = cur.next;
  }

  return list;
}


//  给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
function deleteDuplicates2(head) {
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode();
  dummy.next = head;
  let cur = dummy

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const _val = cur.next.val
      while (cur.next && cur.next.val === _val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
}

// 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 快慢指针。

function deletelistNode(list, n) {
  const dummy = new ListNode();
  dummy.next = list;
  let fast = dummy;
  let slow = dummy;

  let i = 0;
  while (i < n) {
    fast = fast.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next
  }


  slow.next = slow.next.next;

  return dummy.next;
}