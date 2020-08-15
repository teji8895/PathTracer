
export function dijkstra(grid,startNode,finishNode)
{
 const visitedNodesinOrder=[];
 startNode.distance=0;
 const unvisitedNodes=getAllNodes(grid);
 while (!!unvisitedNodes.length)
 {
    sortAllNodes(unvisitedNodes);
    const closestNode=unvisitedNodes.shift();

    if(closestNode.isWall) continue;

    if(closestNode.distance===Infinity) return visitedNodesinOrder;

    closestNode.isVisited=true;

    visitedNodesinOrder.push(closestNode);

    if(closestNode===finishNode) return visitedNodesinOrder;

    updateUnvisitedNeighbours(closestNode,grid);
 }


}


const updateUnvisitedNeighbours=(node,grid)=>{

    const unvistedNeighbours=getUnvisitedNeighbours(node,grid);


    for(const neighbour of unvistedNeighbours)
    {
         neighbour.distance=node.distance+1;
         neighbour.previousNode=node;
    }

    return unvistedNeighbours;

}

const getUnvisitedNeighbours=(node,grid)=>
{

    const neighbours=[];

    const{row,column}=node;

    if(row>0) neighbours.push(grid[row-1][column]);
    
    if(row<grid.length-1) neighbours.push(grid[row+1][column]);

    if(column>0) neighbours.push(grid[row][column-1]);

    if(column<grid[0].length-1) neighbours.push(grid[row][column+1]);


    return neighbours.filter(neighbour=> !neighbour.isVisited);
}

const sortAllNodes=(unvisitedNodes)=>{

    unvisitedNodes.sort((nodeA,nodeB)=> nodeA.distance-nodeB.distance);
}



const getAllNodes=(grid)=>{
    const nodes=[];

    for(const row of grid)
    {
        for(const node of row)
        {
            nodes.push(node);
        }
    }

    return nodes;
}

export function getNodesInShortestPath(finishNode){

const getShortestPath=[];
let currentNode=finishNode;

while (currentNode!==null)
{
    getShortestPath.unshift(currentNode);
    currentNode=currentNode.previousNode;
}

return getShortestPath;
}


