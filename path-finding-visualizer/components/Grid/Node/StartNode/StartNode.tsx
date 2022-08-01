import React, { useRef } from 'react'
import { VscDebugStart } from 'react-icons/vsc'
import { useGridSystem } from '../../../../Hooks/useGridSystem';
import styles from "./startNode.module.scss"


interface StartNodeProps
{
    isClicking : boolean
}

const StartNode = ({isClicking}:StartNodeProps) => {
    const containerRef = useRef<HTMLDivElement>(null); 
    const {setStartIndexClicked} = useGridSystem();


    

    const downHandler = () =>
    {
        if(!containerRef!.current?.classList.contains("focused"))
        {
            containerRef!.current?.classList.add("focused")
            setStartIndexClicked(true);
            console.log("Start ındex clicked")
        }
    }

    const releaseHandler = () =>
    {
        if(containerRef!.current?.classList.contains("focused"))
        {
            containerRef!.current?.classList.remove("focused")
            setStartIndexClicked(false);
        }
    }

    const leaveHandler = () =>
    {
        if(containerRef!.current?.classList.contains("focused"))
        {
            containerRef!.current?.classList.remove("focused")
        }
    }
  return (
    <div ref={containerRef} onMouseDown={downHandler} onMouseUp={releaseHandler} onMouseLeave={leaveHandler}  className={`${styles["container"]} ${isClicking && "focused"}`}>
        <VscDebugStart></VscDebugStart>
    </div>
  )
}

export default StartNode