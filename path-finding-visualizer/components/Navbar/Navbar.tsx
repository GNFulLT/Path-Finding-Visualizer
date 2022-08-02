import React, { useState } from 'react'
import { useGridSystem } from '../../Hooks/useGridSystem';
import styles from "./navbar.module.scss";
import {tryToFind as bfsTryToFind} from "../../algorithms/bfsPF";
import {tryToFind as dfsTryToFind} from "../../algorithms/dfsPF";
import {AiFillCaretDown} from "react-icons/ai";
import { getRowColById } from '../../Hooks/useGridSystem';

enum Algorithms
{
    BFS = 0,
    DFS
}

const AlgoTexts = new Map<Algorithms,string>([[Algorithms.BFS,"Breadth First Search"],[Algorithms.DFS,"Depth First Search"]]);

const Navbar = () => {
    const {clearAllThings,startIndex,clearAllExploreds,getAlgorithmPlaying}= useGridSystem();
    const [selectedAlgo,setSelectedAlgo] = useState<Algorithms>(Algorithms.BFS);
    const startAlgorithm = async () =>
    {
        if(getAlgorithmPlaying())
            return;

        clearAllExploreds();
        const rowCol = getRowColById(startIndex);
        console.log("ROW : "+rowCol.row);
        console.log("COL : "+rowCol.col);
        switch(selectedAlgo)
        {
            case (Algorithms.BFS):
                 await bfsTryToFind(rowCol.row,rowCol.col);
                 break;
            case (Algorithms.DFS):
                await dfsTryToFind(rowCol.row,rowCol.col);
                break;
            default:
                break;
        }
       
    }

  return (
    <div className={styles["container"]}>
        <NavItem setSelectedAlgo={setSelectedAlgo}></NavItem>
        <div className={styles["startDiv"]} >
           <span style={{fontSize:"10px",color:"#0163b7",width:"30px",textAlign:"center",wordWrap:"normal"}}>{AlgoTexts.get(selectedAlgo)}</span> <span onClick={startAlgorithm}>Start</span>
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

interface DropDownMenuProps
{
    children:JSX.Element | JSX.Element[];
    
}

const DropDownMenu = ({children}:DropDownMenuProps) =>
{
    return (
        <div className={styles["drop-down-menu"]}>
            {children}
        </div>
    );
}

interface DropDownItemProps
{
    children:string
    onClicked: (algo:Algorithms) => void
    algo : Algorithms
}

const DropDownItem = ({children,onClicked,algo}:DropDownItemProps) =>
{
    const clickHandler = ()=>
    {
        onClicked(algo);
    }
    return(
        <div onClick={clickHandler} className={styles["drop-down-item"]}>
            {children}
        </div>
    );
}

const NavItem = ({setSelectedAlgo}:any) =>
{
    const [open,setOpen] = useState(false);
    
    const downItemClicked = (algo:Algorithms) =>
    {
        console.log("clicked")
        setOpen(false);
        setSelectedAlgo(algo);
    }

    return (
    <div style={{cursor:"pointer"}}>
        <div className={`${styles["algos"]} ${open && styles["focused"]}`} onClick={() => {setOpen(!open)}}>Algorithms <AiFillCaretDown style={ open ? {transition:"all 0.4s",color:"#b5eaed"} : {}}></AiFillCaretDown></div>
        {open && 
        <DropDownMenu>
            <DropDownItem algo={Algorithms.BFS} onClicked={downItemClicked}>Breadth First Search</DropDownItem>
            <DropDownItem algo={Algorithms.DFS} onClicked={downItemClicked}>Depth First Search</DropDownItem>
        </DropDownMenu>}
    </div>);
}

export default Navbar