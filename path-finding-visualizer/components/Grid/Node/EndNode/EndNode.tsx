import React, { useRef } from 'react'
import {FaFlagCheckered} from "react-icons/fa"
import { useGridSystem } from '../../../../Hooks/useGridSystem'
import styles from "./endNode.module.scss"

interface EndNodeProps
{
    isClicking : boolean
}

const EndNode = ({isClicking}:EndNodeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {setEndIndexClicked} = useGridSystem();
    
    
    const downHandler = () =>
    {
        if(!containerRef!.current?.classList.contains("focused"))
        {
            containerRef!.current?.classList.add("focused")
            setEndIndexClicked(true)
        }
    }

    const releaseHandler = () =>
    {
        if(containerRef!.current?.classList.contains("focused"))
        {
            containerRef!.current?.classList.remove("focused")
            setEndIndexClicked(false)
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
    <div ref={containerRef} onMouseDown={downHandler} onMouseLeave={leaveHandler} onMouseUp={releaseHandler} className={`${styles["container"]} ${isClicking && "focused"}`}>
        <FaFlagCheckered></FaFlagCheckered>
    </div>
  )
}

export default EndNode