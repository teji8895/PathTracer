export  function dfs(grid,startNode,finishNode){

let structure=[]; 
const visitedNodes=[];
structure.push(startNode);

while(!!structure.length){
    
   

    let currentNode=structure.pop();

    //console.log(currentNode);

    currentNode.isVisited=true;

    visitedNodes.push(currentNode);

    if(currentNode===finishNode){
        return visitedNodes;
    }

    let neighbours=getUnvisitedFreeNeigbours(currentNode,grid);

   
    

    for(const neighbour of neighbours){

        structure.push(neighbour);
        neighbour.previousNode=currentNode;

    }

    
   
}

return visitedNodes;

}

const getUnvisitedFreeNeigbours=(node,grid)=>
{

    const neighbours=[];

    const{row,column}=node;

    
     //up
     if(row>0) neighbours.unshift(grid[row-1][column]);

     //right
    if(column<grid[0].length-1) neighbours.unshift(grid[row][column+1]);

     //down
     if(row<grid.length-1) neighbours.unshift(grid[row+1][column]);


     //left
    if(column>0) neighbours.unshift(grid[row][column-1]);

    

   


    return neighbours.filter(neighbour=> !neighbour.isVisited && !neighbour.isWall);
}