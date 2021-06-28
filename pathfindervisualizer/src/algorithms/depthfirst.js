const dfs = [];

export function depthfirst(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.isQueued = true;                             
    dfs.push(startNode);
    while(!!dfs.length) {
        // grab last value in array
        const closestNode = dfs.pop();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        if (closestNode.isQueued === false) closestNode.isQueued = true
        // if closest = infinity -> trapped on edge so return
        if (closestNode.isQueued === false) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);        
    }
}

// change node isQueued status to true and add node to array (Stack)
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = node;
      dfs.push(neighbor);
    }
  }
  
  // add neighbors above, left, right, and below current node
  // adjust a characteristic in the node
  function getUnvisitedNeighbors(node, grid) {
      const neighbors = [];
      const {col, row} = node;

      // this will decide how DFS works because of how a stack works

      // up
      if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
      // left
      if (row > 0) neighbors.push(grid[row - 1][col]);
      // right
      if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
      // down
      if (col > 0) neighbors.push(grid[row][col - 1]);

      return neighbors.filter(neighbor => !neighbor.isVisited);
  }