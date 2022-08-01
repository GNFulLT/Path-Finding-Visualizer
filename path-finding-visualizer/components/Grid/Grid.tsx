import React, { useEffect } from 'react'
import Node from './Node/Node'
import styles from "./grid.module.scss"
import { useMouse } from '../../Hooks/useMouse'
import { useGridSystem } from '../../Hooks/useGridSystem'
import StartNode from './Node/StartNode/StartNode'


interface GridProps
{
    rowCount:number
    columnCount:number
    className?:string
}

const CreateRowColumn = (rowCount:number,columnCount:number) => 
{
    const grid = [];

    for(let row=0;row<rowCount;row++)
    {
        const curRow = [];
        for(let col = 0;col<columnCount;col++)
        {
            curRow.push(((row)*columnCount)+col);
        }
        grid.push(curRow);
    }

    return grid;
}


const Grid = ({rowCount,columnCount,className}:GridProps) => {

  const grid = CreateRowColumn(rowCount,columnCount);
  const{setMousePressing} = useMouse();
  const {initializeGrid} = useGridSystem();
  console.log("sa");
useEffect(() => {
    initializeGrid(rowCount,columnCount);
},[rowCount,columnCount]) 
  
  const {startIndex} = useGridSystem();

  let components = grid.map((row,ind) => {
   
    return(
        <div className={styles["row"]} key={ind}>
            {row.map((colum,indx) =>{
                let isEqual = indx == row.length-1;
                let style = "";
                if(indx == row.length-1)
                    style += `${styles["last-column-child"]} `
                if(ind == grid.length-1)
                    style += `${styles["last-row-child"] }`

                return(
                    <Node id={colum} key={colum} className={style}></Node>
                )
            })}
        </div>
    )
})
   /* if(startIndex == 0)
        return <></>;*/
  return (
    <div onMouseDown={() => setMousePressing(true)} onMouseUp={() => setMousePressing(false)} onMouseLeave={() => setMousePressing(false)} className={`${styles["container"]} ${className || ""}`}>
        {
           components
        }
    </div>
  )
}

export default Grid