/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const h = board.length;
  const w = board[0].length;

  const map = new Array(h).fill(0).map(item=>new Array(w).fill(false));
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  const dfs = (i, j, s, k) => {
    if (board[i][j] !== s[k]) {
      return false;
    }

    if (k === s.length - 1) {
      return true;
    }

    let result = false;

    map[i][j] = true;


    for (let i = 0; i < dir.length; i++) {
      const [x, y] = dir[i]

      const _i = i + x;
      const _j = j + y;

      if (_i < h && _i >= 0 && _j >= 0 && _j < w) {
        if (!map[_i][_j]) {
          const flag = dfs(_i, _j, s, k + 1);

          if(flag){
            result = true;
            break;
          }
          
        }
      }
    }
    map[i][j] = false;
    return result;
  }


  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const flag = dfs(i, j, word, 0);


      if (flag) {
        return true;
      }

      map.clear();
    }
  }

  return false;
};

var exist = function(board, word) {
  const h = board.length, w = board[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const visited = new Array(h);
  for (let i = 0; i < visited.length; ++i) {
      visited[i] = new Array(w).fill(false);
  }
  const check = (i, j, s, k) => {
      if (board[i][j] != s.charAt(k)) {
          return false;
      } else if (k == s.length - 1) {
          return true;
      }
      visited[i][j] = true;
      let result = false;
      for (const [dx, dy] of directions) {
          let newi = i + dx, newj = j + dy;
          if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
              if (!visited[newi][newj]) {
                  const flag = check(newi, newj, s, k + 1);
                  if (flag) {
                      result = true;
                      break;
                  }
              }
          }
      }
      visited[i][j] = false;
      return result;
  }

  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
          const flag = check(i, j, word, 0);
          if (flag) {
              return true;
          }
      }
  }
  return false;
};

