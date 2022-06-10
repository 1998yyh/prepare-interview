var findKthLargest = function (nums, k) {
  function quickSort(left, right) {
    var idx = partion(left, right);
    if (idx > k - 1) {
      return quickSort(left, idx - 1);
    } else if (idx < k - 1) {
      return quickSort(idx + 1, right);
    } else {
      return nums[idx]
    }
  }

  function partion(left, right) {
    var start = left + 1;
    for (let i = start; i <= right; i++) {
      if (nums[i] > nums[left]) {
        [nums[i], nums[start]] = [nums[start], nums[i]];
        start++;
      }
    }
    [nums[start - 1], nums[left]] = [nums[left], nums[start - 1]];
    return start - 1;
  }
  return quickSort(0, nums.length - 1);
};