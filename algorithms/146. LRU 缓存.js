// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

/**
 * @param {number} capacity
 */
 class _node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.mp = {};
		this.size = 0;
		this.head = new _node();
		this.tail = new _node();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	get(key) {
		let node = this.mp[key];
		if (node == null) return -1;
		this.remove(node);
		this.append(node);
		return node.value;
	}

	put(key, value) {
		let node = this.mp[key];
		if (node == null) {
			if (this.size == this.capacity) {
				let tail = this.removeTail();
				delete this.mp[tail.key];
				this.size--;
			}
			let newNode = new _node(key, value);
			this.mp[key] = newNode;
			this.append(newNode);
			this.size++;
		} else {
			node.value = value;
			this.remove(node);
			this.append(node);
		}
	}

	remove(node) {
		let pre = node.prev;
		let nxt = node.next;
		pre.next = nxt;
		nxt.prev = pre;
	}
	//默认就加到队头
	append(node) {
		node.prev = this.head;
		node.next = this.head.next;
		this.head.next.prev = node;
		this.head.next = node;
	}

	removeTail() {
		let tail = this.tail.prev;
		this.remove(tail);
		return tail;
	}
}

