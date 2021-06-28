
const bfsQ = [];
// Perform Breadth-First Search
export function breadthfirst(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.isQueued = true;                             
    bfsQ.push(startNode);
    while(!!bfsQ.length) {
        // grab first value in array
        const closestNode = bfsQ.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // if closest = infinity -> trapped on edge so return
        if (closestNode.isQueued === false) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);        
    }
}

// update queue status and add node to array (Queue)
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.isQueued = true;
    neighbor.previousNode = node;
    bfsQ.push(neighbor);
  }
}

// add neighbors above, left, right, and below current node
// adjust a characteristic in the node
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isQueued);
}