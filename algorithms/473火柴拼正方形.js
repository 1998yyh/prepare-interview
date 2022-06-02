// 你将得到一个整数数组 matchsticks ，其中 matchsticks[i] 是第 i 个火柴棒的长度。你要用 所有的火柴棍 拼成一个正方形。你 不能折断 任何一根火柴棒，
// 但你可以把它们连在一起，而且每根火柴棒必须 使用一次 。

// 如果你能使这个正方形，则返回 true ，否则返回 false 。

//  

// 输入: matchsticks = [1,1,2,2,2]
// 输出: true
// 解释: 能拼成一个边长为2的正方形，每边两根火柴。


/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  // 求出总和 
  const totalLen = matchsticks.reduce((pre,cur)=> pre+ cur);
  // 如果总和不是 4的倍数 那么 说明 无法围城正方形
  if (totalLen % 4 !== 0) {
    return false;
  }

  // 对其从·大到小排序 这样 遍历的时候 可以更方便去寻找 适合的 和 为 边长的元素  
  // 而且也方便快速去排除 某个元素极大的情况 而导致的多余的循环
  matchsticks.sort((a, b) => b-a);
  //  创建对应的数组 记录边长
  const edges = new Array(4).fill(0);
  // 遍历
  return dfs(0, matchsticks, edges, Math.floor(totalLen / 4));
}

const dfs = (index, matchsticks, edges, len) => {
  console.log(index);
  console.log(JSON.stringify(edges));
  // 如果长度已经达到了 最长 则退出遍历
  if (index === matchsticks.length) {
    return true;
  }
  // 去循环边长数组
  for (let i = 0; i < edges.length; i++) {
    // 累加对应的边长
    edges[i] += matchsticks[index];
    console.log(JSON.stringify(edges));
    // 如果边长还是没有达到对应的长度 那么 我们继续累加下一个元素的长度 即 再进行一次dfs
    if (edges[i] <= len && dfs(index + 1, matchsticks, edges, len)) {
      return true;
    }
    // 如果累加的数量超出了 length 我们则需要去给下一个元素累加 
    edges[i] -= matchsticks[index];
  }
  return false;
};



// 2，2，2，1，1,1,1,1,

// dfs 0 1 2 3 4 5