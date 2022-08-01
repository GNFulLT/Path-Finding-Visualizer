import React from 'react'
import { useGridSystem } from '../../Hooks/useGridSystem';
import styles from "./navbar.module.scss";
import {tryToFind} from "../../algorithms/bfsPF";
import {tryToFind as dfsTryToFind} from "../../algorithms/dfsPF";

import { getRowColById } from '../../Hooks/useGridSystem';

const Navbar = () => {
    const {clearAllThings,startIndex,clearAllExploreds,getAlgorithmPlaying}= useGridSystem();


    const startAlgorithm = async () =>
    {
        if(getAlgorithmPlaying())
            return;

        clearAllExploreds();
        const rowCol = getRowColById(startIndex);
        console.log("ROW : "+rowCol.row);
        console.log("COL : "+rowCol.col);

        await tryToFind(rowCol.row,rowCol.col);
    }

  return (
    <div className={styles["container"]}>
        <div>
        Meraba
        </div>
        <div onClick={startAlgorithm}>
            Start
        </div>
        <div>
            <ul>
                <li onClick={() => {clearAllExploreds()}}>Clear Prev</li>
                <li onClick={() => {clearAllThings()}}>Clear All</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar