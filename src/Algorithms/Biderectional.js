export function bidirectional(grid,startNode, finishNode){

const queueforward=[];
const queuebackward=[];
const visitedNodes=[];


startNode.isVisited=true;
finishNode.isVisited=true;

queueforward.push(startNode);
queuebackward.push(finishNode);
let traceNode=null;






while(!!queueforward.length && !!queuebackward.length){

  
        let currentNode=queueforward.shift();

        visitedNodes.push(currentNode);

        if(currentNode.visitedBy==="backward") {
            
            visitedNodes[visitedNodes.length-1].traceBiNode=traceNode;
 
            return visitedNodes;
        }
        currentNode.visitedBy="forward";

          //visitedNodes.push(currentNode);

        let neigbours=getUnvisitedFreeNeigbours(currentNode,grid);

        for(const neighbour of neigbours){

           
            if(!neighbour.isVisited){
                neighbour.isVisited=true;
             
                queueforward.push(neighbour);
                neighbour.previousNode=currentNode;
                
            }
            else if(neighbour.visitedBy==="backward"){
              
                queueforward.unshift(neighbour);
                traceNode=currentNode;
               
            }
            else continue;
            
        }
    

        let currentNode1=queuebackward.shift();

        
        
      

        visitedNodes.push(currentNode1);

        if(currentNode1.visitedBy==="forward") {

          
            console.log(traceNode);
            visitedNodes[visitedNodes.length-1].traceBiNode=traceNode;

            return visitedNodes;
        }
        currentNode1.visitedBy="backward";
         
       // visitedNodes.push(currentNode1);

        let neigbours1=getUnvisitedFreeNeigbours(currentNode1,grid);

        for(const neighbour1 of neigbours1){
            if(!neighbour1.isVisited){
                neighbour1.isVisited=true;
                
                queuebackward.push(neighbour1);
                neighbour1.previousNode=currentNode1;
                
               
            }
            else if(neighbour1.visitedBy==="forward"){
              
                queuebackward.unshift(neighbour1);
                traceNode=currentNode1;
             
            }            
            else continue;
        }

       
    

}

return visitedNodes;

}
 





const getUnvisitedFreeNeigbours=(node,grid)=>
{

    const neighbours=[];

    const{row,column}=node;
    
   

     //right
    if(column<grid[0].length-1) neighbours.push(grid[row][column+1]);

     //down
     if(row<grid.length-1) neighbours.push(grid[row+1][column]);

     //left
    if(column>0) neighbours.push(grid[row][column-1]);

     //up
     if(row>0) neighbours.push(grid[row-1][column]);

    return neighbours.filter(neighbour=> !neighbour.isWall);

}


export function getBiPath(startNode,finishNode,visitedNodes){

    let lastelement=visitedNodes[visitedNodes.length-1];
    let lastSecondelement=visitedNodes[visitedNodes.length-1].traceBiNode;
    const getShortestPath=[];

    if(lastelement.visitedBy==="forward"){
        //start
        while(lastelement!==null){

        getShortestPath.unshift(lastelement);
         lastelement=lastelement.previousNode ;  
        }

        while( lastSecondelement!==null){
            getShortestPath.push(lastSecondelement);
            lastSecondelement=lastSecondelement.previousNode;
        }
    }

    else{
        //start
        while(lastelement!==null){

            getShortestPath.push(lastelement);
             lastelement=lastelement.previousNode ;  
            }
    
            while( lastSecondelement!==null){
                getShortestPath.unshift(lastSecondelement);
                lastSecondelement=lastSecondelement.previousNode;
            }



    }
    
    return getShortestPath;
    }




