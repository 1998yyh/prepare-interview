class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(k) {
    if (!this.cache.get(k)) return -1;
    const v = this.cache.get(k);
    this.cache.delete(k);
    this.cache.set(k, v);
    return v
  }

  set(k, v) {
    if (this.cache.has(k)) {
      this.cache.delete(k)
    }
    this.cache.set(k, v);
    if (this.cache.size > this.capacity) {
      const first = this.cache.keys().next().value;
      this.cache.delete(first)
    }
  }

}