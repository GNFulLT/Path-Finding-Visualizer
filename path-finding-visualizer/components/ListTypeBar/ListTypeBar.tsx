import React from 'react'
import styles from "./listTypeBar.module.scss"
import {FaFlagCheckered} from "react-icons/fa"
import {VscDebugStart} from "react-icons/vsc"
import NodeS from '../Grid/Node/NodeS'
const ListTypeBar = () => {
  return (
    <div className={styles["container"]}>
        <ul>
            <li><div className={styles["desc"]}><VscDebugStart></VscDebugStart><span>Start Location</span></div></li>
            <li><div className={styles["desc"]}><FaFlagCheckered></FaFlagCheckered><span>End Location</span></div></li>
            <li><div className={styles["desc"]}><NodeS></NodeS><span>Unvisited Node</span></div></li>
            <li><div className={styles["desc"]}><NodeS className='rock' borderWidth={0}></NodeS><span>Wall Node</span></div></li>

        </ul>
    </div>
  )
}

export default ListTypeBar