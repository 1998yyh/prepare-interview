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
      cur.next = cur.next.next;
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
  let cur = dummy;

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const _val = cur.next.val;
      while (cur.next && cur.next.val === _val) {
        cur.next = cur.next.next;
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
  // 快指针
  let fast = dummy;
  // 慢指针
  let slow = dummy;

  let i = 0;
  while (i < n) {
    fast = fast.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}

// 翻转链表
function reverseListNode(head) {
  let pre = null;
  let cur = head;

  while (cur) {
    // 记录后面所有的节点
    const next = cur.next;
    // 当前的next指向null
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

function reverseBetween(head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, cur, leftHead;
  // 别忘了用 dummy 嗷
  const dummy = new ListNode();
  // dummy后继结点是头结点
  dummy.next = head;
  // p是一个游标，用于遍历，最初指向 dummy
  let p = dummy;
  // p往前走 m-1 步，走到整个区间的前驱结点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  // 缓存这个前驱结点到 leftHead 里
  leftHead = p;

  // start 是反转区间的第一个结点
  let start = leftHead.next;
  // pre 指向start
  pre = start;
  // cur 指向 start 的下一个结点
  cur = pre.next;
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  //  leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre;
  // 将区间内反转后的最后一个结点 next 指向 cur
  start.next = cur;
  // dummy.next 永远指向链表头结点
  return dummy.next;
}

  // 判断链表是否成环
  function hasCycle(list){
    let cur = list;
    while(cur){
      if(cur.flag){
        return true;
      }
      cur.flag = true;
      cur = cur.next;
    }
    return false;
  }

  // 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。
  function cycleNode(list){
    let cur = list;
    while(cur){
      if(cur.flag){
        return cur;
      }
      cur.flag = true;
      cur = cur.next;
    }
    return false;
  }