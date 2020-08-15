import React from 'react';
import './PathFinderVisualizer.css';
import Node from '../Node/Node';
import {dijkstra,getNodesInShortestPath} from '../Algorithms/Dijkstra';
import {Astar} from '../Algorithms/Astar';
import {dfs} from '../Algorithms/DFS';
import {bfs} from '../Algorithms/BFS';
import {bidirectional,getBiPath} from '../Algorithms/Biderectional';

const START_NODE_ROW=7;
const START_NODE_COL=5;
const END_NODE_ROW=5;
const END_NODE_COL=30;

class PathFindingVisulaizer extends React.Component{

  

    constructor(){
        super();
        this.state={
            grid:[],
            mouseIsPressed:false,
            start:[START_NODE_ROW,START_NODE_COL],
            end:[END_NODE_ROW,END_NODE_COL],
            startPointPressed:false,
            finishPointPresed:false,
            algoValue:"dijkshtra"
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }


    //handle change of algorithm selection from the drop down
    handleChange(event){

        const{grid,start}=this.state;
        if(grid[start[0]][start[1]].isVisited) {
            alert("Please clear the Board and then select");
            return;
        }

        this.setState({algoValue: event.target.value});
    }

    //handle the submission of algo search post selection
    handleSubmit(event){

        const grid=this.state.grid;
        if(grid[START_NODE_ROW][START_NODE_COL].isVisited) {
            alert("Please clear the Board and then select");
            event.preventDefault();
            return;
        }

        if(this.state.algoValue==="dijkshtra")  this.visualizeDijskhtra();
        else if(this.state.algoValue==="AStar") this.visualizeAStar();
        else if(this.state.algoValue==="dfs") this.visualizeDFS();
        else if(this.state.algoValue==="bfs") this.visualizeBFS();
        else if(this.state.algoValue==="Bidirectional") this.visualizeBidirectional();
        else alert("Wrong Selection");

        event.preventDefault();
    }


    
    handleMouseDown(row,column){

      
     
        if((row===this.state.start[0] && column===this.state.start[1]))
        {
            
            this.setState({startPointPressed:true,mouseIsPressed:true});
        }
        else if((row===this.state.end[0] && column===this.state.end[1]))
        {
            
            this.setState({finishPointPresed:true,mouseIsPressed:true});
        }
        else{
            const newGrid= GetNewWallsGrid(this.state.grid,row,column);
            this.setState({grid:newGrid,mouseIsPressed:true});
        }

    }

    handleMouseEnter(row,column){
        
        if(!this.state.mouseIsPressed) return;

        else if(this.state.startPointPressed){

            const newStart= GetNewStartPoints(this.state.start,row,column);
            this.setState({start:newStart});
        }   
        else if(this.state.finishPointPresed){
            const newEnd=GetNewFinishPoints(this.state.end,row,column);
            this.setState({end:newEnd});
        }
        else{
        const newGrid= GetNewWallsGrid(this.state.grid,row,column);
        this.setState({newGrid});
        }
        }

    


    handleMouseUp(row,column){
        
         this.setState({mouseIsPressed:false,startPointPressed:false,finishPointPresed:false    });
    }

    componentDidMount()
    {
        
        const newgrid=getInitialGrid();
        this.setState({grid:newgrid});
        
       
    }

    
         //Ignore the below code

    clearGrid(){
       
        const newgrid=getInitialGrid();
        this.setState({grid:newgrid,
            start:[START_NODE_ROW,START_NODE_COL],
            end:[END_NODE_ROW,END_NODE_COL],
        });
       
        for(let row=0;row<15;row++){
            
            for(let column=0;column<34;column++){

                if(row===START_NODE_ROW && column===START_NODE_COL){

                    document.getElementById(`Node -${row}-${column}`).className='Node node-start';


                }
                else if(row===END_NODE_ROW && column===END_NODE_COL){
                document.getElementById(`Node -${row}-${column}`).className='Node node-finish';
                }

                else document.getElementById(`Node -${row}-${column}`).className='Node ';


            }
        }

      // console.log(this.state.grid);
        

    
}

    animateDijkstra(visitedNodesInOrder,getShortestPathInOrder){
        
        for(let i=0;i<=visitedNodesInOrder.length;i++)
        {
            if(i===visitedNodesInOrder.length)
            {
               
                setTimeout(()=> {
                for(let j=getShortestPathInOrder.length-1;j>=0;j--)
                {
                    setTimeout(()=> {
                        const nodeInShortestPath=getShortestPathInOrder[j];
                        document.getElementById(`Node -${nodeInShortestPath.row}-${nodeInShortestPath.column}`).className='Node node-shortestPath';
                    },50*j);
                }

            },20*i);
                 return;

            }

            setTimeout(() =>{
                const node=visitedNodesInOrder[i];
                
                document.getElementById(`Node -${node.row}-${node.column}`).className='Node node-visited';
            },20*i);

        }

    }

 


    visualizeDijskhtra(){
        const{grid,start,end}= this.state;
        const startNode= grid[start[0]][start[1]];
        const finishNode= grid[end[0]][end[1]];
        const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
        const getShortestPathInOrder=getNodesInShortestPath(finishNode);
      
        this.animateDijkstra(visitedNodesInOrder,getShortestPathInOrder);

        
    }

    visualizeAStar(){
        const{grid,start,end}= this.state;
        const startNode= grid[start[0]][start[1]];
        const finishNode= grid[end[0]][end[1]];
        const visitedNodesInOrder=Astar(grid,startNode,finishNode);
        const getShortestPathInOrder=getNodesInShortestPath(finishNode);
       
        this.animateDijkstra(visitedNodesInOrder,getShortestPathInOrder);

        
    }

    visualizeDFS(){
        const{grid,start,end}= this.state;
        const startNode= grid[start[0]][start[1]];
        const finishNode= grid[end[0]][end[1]];
        const visitedNodesInOrder=dfs(grid,startNode,finishNode);
        const getShortestPathInOrder=getNodesInShortestPath(finishNode);
       
       this.animateDijkstra(visitedNodesInOrder,getShortestPathInOrder);

        
    }   

    visualizeBFS(){
        const{grid,start,end}= this.state;
        const startNode= grid[start[0]][start[1]];
        const finishNode= grid[end[0]][end[1]];
        const visitedNodesInOrder=bfs(grid,startNode,finishNode);
        const getShortestPathInOrder=getNodesInShortestPath(finishNode);
        
       this.animateDijkstra(visitedNodesInOrder,getShortestPathInOrder);


    }

    visualizeBidirectional(){

        const{grid,start,end}=this.state;
        
        const startNode= grid[start[0]][start[1]];
        const finishNode= grid[end[0]][end[1]];
        const visitedNodesInOrder=bidirectional(grid,startNode,finishNode);
        const getShortestPathInOrder=getBiPath(startNode,finishNode,visitedNodesInOrder);
        this.animateDijkstra(visitedNodesInOrder,getShortestPathInOrder);
       

    }
    
    

    render(){
        const {grid,mouseIsPressed,start,end}= this.state;

       

        return (

    <div>
            <div className="navbar">
                <h1>Path Visualizer</h1>
                <hr/>
            <form onSubmit={this.handleSubmit} className="dropdown">
            <label>
                Pick Your favourite Algorithm:
                <select value ={this.state.algoValue} onChange={this.handleChange}>
                    <option value="dijkshtra">Dijkstra Search</option>
                    <option value="dfs">Depth First Search</option>
                    <option value="bfs">Breadth First Search</option>
                    <option value="AStar">AStar Search</option>
                    <option value="Bidirectional">Bidirectional Search</option>
                    </select>
            </label>
            
                <input type="submit" value ="Submit" />
            </form>

            </div>
            <br/>

        <button className="button" onClick={()=> this.clearGrid(this)}>CLear Board</button>
       
        
        
        
        <div className="grid">
            { grid.map((row,rowIdx)=>{
                
               
                return(
                    <div className="row" key={rowIdx}>
                        {
                             row.map((node,nodeIdx)=>{

                                const {row,column,isWall,isVisited}=node;
                                return(
                                    <Node
                                        key={nodeIdx}
                                        column={column}
                                        row={row}
                                        isFinish={end[0]===row && end[1]===column}
                                        isWall={isWall}
                                        isStart={start[0] ===row && start[1]===column}
                                        isVisited={isVisited}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row,column)=> this.handleMouseDown(row,column)}
                                        onMouseEnter={(row,column)=> this.handleMouseEnter(row,column)}
                                        onMouseUp={(row,column)=> this.handleMouseUp(row,column)}
                                        >
                                    </Node>
                                        
                                   
                                );
                            })
                            
                        }
                       
                       
                    </div> 
                    
                );

            })
            }   
        </div>
    </div> 
        );
    }
 
}


const getInitialGrid=() =>{

const grid=[];

for(let row=0;row<15;row++){
    const currentRow=[];
    for(let column=0;column<34;column++){

        currentRow.push(createNode(column,row));

    }

    grid.push(currentRow);
}

return grid;
}

const createNode=(column,row)=>{
   
    return{
    
        column,
        row,
        isStart:false,
        isFinish:false,
        distance:Infinity,
        isVisited:false,
        isWall:false,
        previousNode:null,
        fscore:0,
        visitedBy:null,
        traceBiNode:null,
        heuristic:0,
    };
    
    }



const GetNewStartPoints=(start,row,column)=>{
    const newStart=start.slice();

    newStart[0]=row;
    newStart[1]=column;

    return newStart;
}


const GetNewFinishPoints=(end,row,column)=>{

    const newEnd =end.slice();

    newEnd[0]=row;
    newEnd[1]=column;

    return newEnd;
}


const GetNewWallsGrid=(grid,row,column)=>{
const newGrid=grid.slice();

const node=newGrid[row][column];

const newNode = {

    ...node,
    isWall:!node.isWall,
}

newGrid[row][column]=newNode;
return newGrid;

}

export default PathFindingVisulaizer;