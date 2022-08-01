import React from 'react'
import styles from "./node.module.scss"

interface NodeSProps
{
    className?:string
    borderWidth?:number
}

const NodeS = ({className,borderWidth}:NodeSProps) => {
    let bWidth = 1;
    if(borderWidth != undefined || borderWidth != null)
        bWidth = borderWidth;
  return (
    <div style={{borderWidth:bWidth}} className={styles["container"] + " " + className}>
      
    </div>
  )
}

export default NodeS