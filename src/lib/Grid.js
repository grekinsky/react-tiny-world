/**
 * Count cells filled
 * @param {Array} grid
 */
export function countFilledCells(grid) {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      count += grid[y][x];
    }
  }
  return count;
}

/**
 * Returns a String representation of {x, y} position
 * @param {Object} pos
 */
const getCellId = ({ x, y }) => `${x},${y}`;

/**
 * an island is a collection of cells that are filled
 * and connected in the X or Y axis (Not diagonally).
 */
const possibleWays = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

/**
 * Calculates the amount of islands
 * @param {Array} grid
 */
export function countIslands(grid) {
  let count = 0;

  // keep track of visited nodes to avoid revisit
  const visited = {};

  // iterate through each cell
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // unvisited filled cells only, otherwise jump to next cell
      if (grid[y][x] === 0 || visited[getCellId({ x, y })]) continue;

      // Note: used Breath First Search approach,
      //  may be improved by memoizing previous filled cells
      //  and only going through them instead of the entire Grid.)

      // BFS queue for adding nodes to visit later
      const queue = [{ x, y }];

      // while nodes in queue (same island nodes)
      while (queue.length) {
        // pop last node from the queue
        const current = queue.pop();

        // get cell ID for the node
        const currentId = getCellId(current);

        // jump to next item in queue in case is already visited
        if (visited[currentId]) continue;

        // get grid boundaries
        const maxY = grid.length - 1;
        const maxX = grid[0].length - 1;

        // visit possible paths
        for (let i = 0; i < possibleWays.length; i++) {
          const value = possibleWays[i];

          // calculate position based on the current possible way
          const pos = { x: current.x + value[0], y: current.y + value[1] };

          // jump to next possible way if this one is out of bounds
          if (pos.x < 0 || pos.y < 0 || pos.x > maxX || pos.y > maxY) continue;

          // if grid item is filled, add it to queue
          if (grid[pos.y][pos.x] === 1) {
            queue.unshift(pos);
          }
        }

        // all good, mark this node as visited
        visited[currentId] = true;
      }

      // finished exploring island
      count++;
    }
  }

  // return island count
  return count;
}

/**
 * @todo Create method to resize Grid (may clean the
 *  Grid or preserve filled cells)
 * @param {Array} grid
 * @param {Number} width
 * @param {Number} height
 */
export function resize(grid, width, height) {
  let g = [...grid];
  // modify rows (height)
  if (height < g.length) {
    // reduce size
    g = g.slice(0, height);
  } else if (height > g.length) {
    // increase size
    for (let i = grid.length; i < height; i++) {
      g[i] = new Array(width).fill(0);
    }
  }

  // for each row, modify columns
  for (let i = 0; i < height; i++) {
    if (width < g[i].length) {
      // reduce size
      g[i] = g[i].slice(0, width);
    } else if (width > g[i].length) {
      // increase size
      Array.prototype.push.apply(g[i], new Array(width - g[i].length).fill(0));
    }
  }
  return g;
}

/**
 * Toggles the value of a cell in the grid
 * @param {Array} grid bidimensional array of grid
 * @param {Object} pos {x, y} coords of the cell
 */
export function toggle(grid, pos) {
  return grid.map((row, x) => {
    if (pos.x !== x) {
      return row;
    }
    return row.map((cell, y) => {
      if (pos.x === x && pos.y === y) {
        return cell === 0 ? 1 : 0;
      }
      return cell;
    });
  });
}
