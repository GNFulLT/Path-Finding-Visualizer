import {isExplored} from "../Hooks/useGridSystem";
import {explore} from "../Hooks/useGridSystem";
import {isValidNode} from "../Hooks/useGridSystem";
import {followExplore} from "../Hooks/useGridSystem";
import {deFollowLastExplore,startAlgorithm,finishAlgorithm} from "../Hooks/useGridSystem";

const timer = (ms:number) => new Promise(res => setTimeout(res, ms))

type Node =
{
    row:number
    column:number
}


export const tryToFind = async(startRow:number,startColumn:number) =>
{
    startAlgorithm();

    const queue = [] as Node[];
    console.log("Aranıyor")
    queue.push({row:startRow,column:startColumn} as Node);
    explore(startRow,startColumn);
    let wait = 0;
    let isNext = false;
    while(queue.length > 0)
    {
        const {row,column} = queue.shift()!;
        
        const neighbors = [
            {row:row-1,column},
            {row,column:column+1},
            {row:row+1,column},
            {row,column:column-1},
        ]
        console.log("Neighborlar alındı");
        for(let i = 0;i<neighbors.length;i++)
        {
            const nRow = neighbors[i].row;
            const nCol = neighbors[i].column;

            if(isExplored(nRow,nCol))
                continue;
            if(!isValidNode(nRow,nCol))
                continue;
            
      
            const isTrue = explore(nRow,nCol);
              if(isTrue)
              { 
                deFollowLastExplore();
                finishAlgorithm();
                return;
              }

            if(isNext)
            {
                followExplore(nRow,nCol);
                isNext = false;
            }
            
            
            
            queue.push(neighbors[i]);

        }
        if(wait == 16)
        {
            await timer(80);
            wait = 0;
        }
        else if(wait == 2)
        {
            deFollowLastExplore();
            isNext = true;
            wait++;
        }
        else
        {
            wait++;
        }
    }
    finishAlgorithm();
}