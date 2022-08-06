import { RefObject, useRef, useState } from 'react';
import * as React from 'react'

interface GridSystemType
{
    transformRock : (key:number,ref:RefObject<HTMLDivElement>) => void
    clearAllThings : () => void
    clearAllExploreds : () => void
    removeRock : (key:number) => void
    initializeGrid : (rowCount:number,columnCount:number) => void
    clearGrid : () => void
    subscribeToGrid : (key:number,ref:RefObject<HTMLDivElement>) => void
    startIndex : number
    endIndex : number
    setStartIndex : (key:number) => void
    setEndIndex : (key:number) => void
    getStartIndexClicked : () => boolean 
    setStartIndexClicked : (c : boolean) => void
    getEndIndexClicked : () => boolean
    setEndIndexClicked : (c:boolean) => void
    getAlgorithmPlaying : () => boolean
}

let rocks  = new Map<number,RefObject<HTMLDivElement>>();
let grid =  new Map<number,RefObject<HTMLDivElement>>();
let exploreds = new Map<number,RefObject<HTMLDivElement>>();
let shortestPaths = new Map<number,RefObject<HTMLDivElement>>();

let _rowCount = 0;
let _columnCount = 0;
let _maxIndex = 0;
let endIndexClicked = false;
let startIndexClicked = false;
let gEndIndex = 0;
let lastExplore : RefObject<HTMLDivElement> | null = null;
let isAlgorithmPlaying = false;

export const setRed = (row:number,column:number) =>
{
    const id = ((row)*_columnCount)+column;
    if(grid.get(id)?.current?.classList.contains("red"))
        return;
        grid.get(id)?.current?.classList.add("red")
    return;
}

export const clearAllShortestPath = () =>
{
    shortestPaths.forEach((value,key) => {
        if(!value?.current?.classList.contains("shortest"))
            return;
        value?.current?.classList.remove("shortest")
    })
}

export const setShortestPath = (row:number,column:number) =>
{
    const id = ((row)*_columnCount)+column;
    if(grid.get(id)?.current?.classList.contains("shortest"))
        return;
    grid.get(id)?.current?.classList.add("shortest")
    shortestPaths.set(id,grid.get(id)!);
    return;
}

export const isExplored = (row:number,column:number) : boolean => 
{
    const id = ((row)*_columnCount)+column;
    console.log("ID DENENIYOR : "+id);
    
    return grid.get(id)?.current?.classList.contains("explored") || false;
    
}

export const startAlgorithm = () =>
{
    isAlgorithmPlaying = true;
}

export const finishAlgorithm = () =>
{
    isAlgorithmPlaying = false;
}

export const followExplore = (row:number,column:number) =>
{
    const id = ((row)*_columnCount)+column;
    lastExplore = grid.get(id) || null;
    lastExplore?.current?.classList.add("followExplore");
}

export const deFollowLastExplore = () =>
{
    if(lastExplore != null)
    {
        lastExplore.current?.classList.remove("followExplore");
    }
}

export const isValidNode = (row:number,column:number) : boolean =>
{
    
    if(row >= _rowCount || row < 0 || column < 0 || column >= _columnCount)
        return false;
    
    const id = ((row)*_columnCount)+column;

    //Check node is wall
    if(grid.get(id)?.current?.classList.contains("rock"))
    {
        return false;
    }

    return true;
}

export const explore = (row:number,column:number) : boolean => 
{
    const id = ((row)*_columnCount)+column;
    console.log("EXPLORELANIYOR : "+id);
    if(grid.get(id) != null)
    {
        grid.get(id)!.current!.classList.add("explored");
        exploreds.set(id,grid.get(id)!);
    }
    if(gEndIndex == id)
        return true;
    return false;
}

export const getRowColById = (id:number) => 
{
    const column = id % _columnCount;
    const row = Math.floor(id / _columnCount);

    return {row,column};

}

const getEndIndexClicked = () => 
{
    // @ts-ignore:next-line
    //return window.endIndexClicked;
    if(isAlgorithmPlaying)
        return false;
    return endIndexClicked;
}

const setEndIndexClicked = (c:boolean) =>
{
    // @ts-ignore:next-line
    //window.endIndexClicked = c;
    endIndexClicked = c;
}

const getStartIndexClicked = () =>
{
    if(isAlgorithmPlaying)
        return false;
    return startIndexClicked;
}
// const [startIndexClicked,setStartIndexClicked] = useState(false)
const setStartIndexClicked = (c:boolean) =>
{
    // @ts-ignore:next-line
    //window.startIndexClicked = clicked;
    startIndexClicked = c;
}


//Providers
const GridSystemContext = React.createContext<GridSystemType >({} as GridSystemType);

const GridSystemProvider : React.FC<any> = ({children}) => 
{
    console.log("ı a(m the grid system")
    //let startIndexClicked = false;
    
    const [endIndex,setEndIndex] = useState(0);
    const [startIndex,setStartIndex] = useState(0);
    gEndIndex = endIndex;
   
    const getAlgorithmPlaying = () : boolean => 
    {
        return isAlgorithmPlaying;
    }
    
   // const [endIndexClicked,setEndIndexClicked] = useState(false)
    const transformRock = (key:number,ref:RefObject<HTMLDivElement>) =>
    {
        if(isAlgorithmPlaying)
            return;
        console.log("Eklencek")
        console.log(key);
        if(ref.current!.classList!.contains("rock"))
            return;
        console.log("va rock yoksa eklenicek");
        ref.current!.classList!.add("rock");
        
        rocks.set(key,ref);

    }

    const setGridConsts = () =>
    {
        if(isAlgorithmPlaying)
            return;

        let startfIndex =Math.floor(Math.random() * (_maxIndex + 1)); 
        setStartIndex(startfIndex);
        console.log("startIndex setted to "+ startIndex)
        let enfdIndex = Math.floor(Math.random() * (_maxIndex + 1));
        while(enfdIndex == startfIndex)
        {
            enfdIndex = Math.floor(Math.random() * (_maxIndex + 1));
        }
        setEndIndex(enfdIndex)
        console.log("endIndex setted to "+ enfdIndex)

    }

    const clearGrid = () => 
    {
        if(isAlgorithmPlaying)
            return;
        grid =  new Map<number,RefObject<HTMLDivElement>>();
    }

    const clearAllRocks = () =>
    {
        if(isAlgorithmPlaying)
            return;

        console.log("Herşey silinmeyi denicek")
        console.log(rocks);
        rocks.forEach((value,key) => {
            value?.current?.classList.remove("rock");
        })
        rocks = new Map<number,RefObject<HTMLDivElement>>();
    }

    const clearAllExploreds = () =>
    {
        if(isAlgorithmPlaying)
            return;

        exploreds.forEach((value,key) => {
            value?.current?.classList.remove("explored");
        })
        exploreds = new Map<number,RefObject<HTMLDivElement>>();
    }

    const clearAllThings = () =>
    {
        
        clearAllRocks();
        clearAllExploreds();
        clearAllShortestPath();
    }

    const initializeGrid = (rowCount:number,columnCount:number) =>
    {
        
        _rowCount = rowCount;
        _columnCount = columnCount;
        _maxIndex = (rowCount * columnCount) - 1;
        console.log("Grid Initialized : ");
        console.log(`Row Count : ${_rowCount}`);
        console.log(`Column Count : ${_columnCount}`);
        console.log(`Max Index : ${_maxIndex}`);
        setGridConsts();
    }



    const subscribeToGrid = (key:number,ref:RefObject<HTMLDivElement>) => 
    {
        grid.set(key,ref);
        console.log("Added to grid");
        console.log(`Grid Count : ${grid.size}`)
    }

    const removeRock = (key:number) =>
    {
        if(isAlgorithmPlaying)
            return;

        if(!rocks.has(key))
            return;
        
        let ref = rocks.get(key);
        if(!ref?.current?.classList.contains("rock"))
            return;
        
        ref?.current?.classList.remove("rock")
        
        rocks.delete(key);
        
    }

    return(
        <GridSystemContext.Provider value={{getAlgorithmPlaying,setEndIndexClicked,getEndIndexClicked,getStartIndexClicked,setStartIndexClicked,setStartIndex,setEndIndex,endIndex,transformRock,removeRock,clearAllThings,clearAllExploreds,initializeGrid,clearGrid,subscribeToGrid,startIndex}}>
        {children}
        </GridSystemContext.Provider>
    );
}



export const useGridSystem = () => React.useContext(GridSystemContext);

export default GridSystemProvider;