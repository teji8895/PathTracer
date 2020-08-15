
export function Astar(grid,startNode,finishNode){

  let openSet=[];
  let closedSet=[];
 startNode.distance=0;
  openSet.push(startNode);

  while(!!openSet.length)
  {
     let winner=0;
     for(let i=0;i<openSet.length;i++)
     {
        if(openSet[i].fscore<openSet[winner].fscore)
        {
            winner=i;
        }
     }

     let current=openSet[winner];

     if(current.isWall)
     {

        openSet=removeArray(openSet,current); 
        continue;
     }

     
     current.isVisited=true;

     if(current===finishNode)
     {
        
         return closedSet;
     }

     

    openSet=removeArray(openSet,current);    

     

    closedSet.push(current);
     
    const unvistedNeighbours=getUnvisitedNeighbours(current,grid);

    for(const neighbour of unvistedNeighbours)
    {   

            
            var tempG=current.distance + 1;

            var newPath=false;

            if(openSet.includes(neighbour))
            {
                if(tempG<neighbour.distance){
                    neighbour.distance=tempG;
                    newPath=true;
                }
            }
            else{
                neighbour.distance=tempG;

                newPath=true;
                openSet.push(neighbour);
            }
        
            if(newPath)
            {
            neighbour.heuristic=heuristic(neighbour,finishNode);
            neighbour.fscore=neighbour.distance+neighbour.heuristic;
            neighbour.previousNode=current;
            }
        
    }

    

  }

  return closedSet;

}




function heuristic(neighbour, finishNode)
{
   var d=Math.abs(neighbour.row-finishNode.row) + Math.abs(neighbour.column-finishNode.column);
   
    return d;
}


const getUnvisitedNeighbours=(node,grid)=>
{

    const neighbours=[];

    const{row,column}=node;

    if(row>0) neighbours.push(grid[row-1][column]);
    
    if(row<grid.length-1) neighbours.push(grid[row+1][column]);

    if(column>0) neighbours.push(grid[row][column-1]);

    if(column<grid[0].length-1) neighbours.push(grid[row][column+1]);


    return neighbours.filter(neighbour=> !neighbour.isVisited) ;
}

const removeArray=(arr,val)=>{

    for(var i=arr.length-1;i>=0;i--)
    {

        if(arr[i]===val){
            arr.splice(i,1);
        }

    }

    return arr;
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