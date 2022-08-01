import React, { useEffect, useReducer, useRef } from 'react'
import { VscDebugStart } from 'react-icons/vsc';
import { useGridSystem } from '../../../Hooks/useGridSystem';
import { useMouse } from '../../../Hooks/useMouse';
import EndNode from './EndNode/EndNode';
import styles from "./node.module.scss"
import StartNode from './StartNode/StartNode';

interface NodeProps
{
    className?:string
    id:number
}

const Node = ({className,id}:NodeProps) => {

    const {endIndex,setStartIndex,getEndIndexClicked,setEndIndex,setEndIndexClicked,getStartIndexClicked,setStartIndexClicked,transformRock,removeRock,subscribeToGrid,startIndex} = useGridSystem();
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    let isStart = startIndex == id;
    let isEnd = endIndex == id;
    let isNormal = true;
    let addComp = <></>;
    if(isStart)
    {
        addComp = <StartNode isClicking={getStartIndexClicked()}></StartNode>;
        isNormal = false;
    }
    else if(isEnd)
    {
        addComp = <EndNode isClicking={getEndIndexClicked()}></EndNode>
        isNormal = false;

    }

    const containerRef = useRef<HTMLDivElement>(null);
    const {getMousePressing} = useMouse();
    useEffect(() => {
        subscribeToGrid(id,containerRef)
    },[id])
    const setRockPressing = () =>
    {
        if(getStartIndexClicked())
            setStartIndexClicked(false);
        if(getEndIndexClicked())
            setEndIndexClicked(false);
        if(!isNormal)
            return;
        if(containerRef.current?.classList.contains("rock"))
        {
            removeRock(id);
        }
        else
        {
            transformRock(id,containerRef);
        }
        //containerRef.current?.classList.toggle("rock")
        
    }
    
    const setRockEntering = () => 
    { 
        forceUpdate();
        if(!isNormal)
            return;
        if(!getMousePressing())
        {
            setStartIndexClicked(false);
            setEndIndexClicked(false);
            return;
        }
        if(getStartIndexClicked())
        {
            if(containerRef.current?.classList.contains("rock"))
                return;
            console.log("Start Index changing")
            if(startIndex != id)
                setStartIndex(id);
            return;
        }
        else if(getEndIndexClicked())
        {
            if(containerRef.current?.classList.contains("rock"))
                return;
            console.log("End Index changing")
            if(endIndex != id)
                setEndIndex(id);
            return;
        }
            if(containerRef.current?.classList.contains("rock"))
            {
                removeRock(id);
            }
            else
            {
                transformRock(id,containerRef);
            }
            //containerRef.current?.classList.toggle("rock")

    }
  return (
    <div ref={containerRef} onMouseEnter={setRockEntering} onClick={setRockPressing} className={`${styles["container"]} ${className}`}>
        {addComp}
    </div>
  )
}

export default Node