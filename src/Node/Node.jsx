import React from 'react';
import './Node.css'

class Node extends React.Component{

    render()
    {
        
        const{column,isFinish,isStart,isWall,row,onMouseUp,onMouseDown,onMouseEnter,isVisited}=this.props;
        
        const extraClassName = isFinish? 'node-finish':
                               isStart?  'node-start' :
                               isWall?   'node-wall':
                               !isVisited? '..':
                               '';
       
        return (

            <div

            id={`Node -${row}-${column}`}
            className={`Node ${extraClassName}`}
            onMouseDown={()=> onMouseDown(row,column)}
            onMouseEnter={()=> onMouseEnter(row,column)}
            onMouseUp={()=> onMouseUp(row,column)}

            ></div>
        );

    }



}

export default Node;