export function bfs(grid,startNode,finishNode){

    const queue=[];
    queue.push(startNode);
    const visitedNodes=[];
    startNode.isVisited=true;


    while(!!queue.length){

        let currentNode=queue.shift();

        visitedNodes.push(currentNode);

        if(currentNode===finishNode)
        {
            
            return visitedNodes;
            
        }

        let neigbours=getUnvisitedFreeNeigbours(currentNode,grid);

        for(const neighbour of neigbours){

            neighbour.isVisited=true;
            queue.push(neighbour);
            neighbour.previousNode=currentNode;


        }

        
        

 }

}

const getUnvisitedFreeNeigbours=(node,grid)=>
{

    const neighbours=[];

    const{row,column}=node;
    
    //up
     if(row>0) neighbours.push(grid[row-1][column]);

     //right
    if(column<grid[0].length-1) neighbours.push(grid[row][column+1]);

     //down
     if(row<grid.length-1) neighbours.push(grid[row+1][column]);

     //left
    if(column>0) neighbours.push(grid[row][column-1]);

    return neighbours.filter(neighbour=> !neighbour.isVisited && !neighbour.isWall);
}