import { Node } from "../types/Node"
import { WNode } from "../types/WNode";
import { isExplored } from "../Hooks/useGridSystem";
import { ShortestFindResponse } from "../types/ShortestFindResponse";
import { setShortestPath } from "../Hooks/useGridSystem";


export const buildShortestPath = async(startNode:Node,endNode:Node) =>
{
   let res = await findShortestPath(startNode,endNode);
   
    if(!res.founded)
        return;
   
  
    let curNode = res.founds!.get(`${startNode.row}${startNode.column}`)!;
    setShortestPath(curNode.row,curNode.column);
    let clamper = 0;
    while(!( curNode.row == endNode.row && curNode.column == endNode.column))
    {
        if(clamper == res.founds!.size*5)
        {
            console.log("buga girdi aq");
            return;
        }
        const {row,column,weight} = curNode;
        const neighbors = [
            {row:row-1,column},
            {row,column:column+1},
            {row:row+1,column},
            {row,column:column-1},
        ]

        let nap = new Map<number,WNode>();
        let shortestWeight = weight;
        for(let i = 0;i<neighbors.length;i++)
        {
            const nRow = neighbors[i].row;
            const nCol = neighbors[i].column;

            let key = `${nRow}${nCol}`;
            if(!res.founds!.has(key))
                continue;
            
            let curWNode = res.founds!.get(key)!;

            nap.set(curWNode.weight,curWNode);

            console.log("Cur weight : "+curWNode.weight);
            console.log("Shortest weight "+shortestWeight );
            console.log("UP WEİGHT : "+res.founds!.get(`${neighbors[2].row}${neighbors[2].column}`)?.weight)
            let as = neighbors[2].row == endNode.row && neighbors[2].column == endNode.column;
            console.log("UP WEIGHT ?? END : "+as)
            if(curWNode.weight <= shortestWeight)
                shortestWeight = curWNode.weight;
        }

        curNode = nap.get(shortestWeight)!;
      
        setShortestPath(curNode.row,curNode.column);
        console.log("1.iterate")
        clamper++;
    }
    setShortestPath(curNode.row,curNode.column);
    return;
}


const findShortestPath = async(startNode:Node,endNode:Node) : Promise<ShortestFindResponse> =>
{
    let queue = [] as WNode[];
    let founds = new Map<string,WNode>();
    
    queue.push({row:endNode.row,column:endNode.column,weight:0});
    founds.set(`${endNode.row}${endNode.column}`,queue[0]);
    while(queue.length > 0)
    {
        const {row,column,weight} = queue.shift()!;
        const neighbors = [
            {row:row-1,column,weight:weight+1},
            {row,column:column+1,weight:weight+1},
            {row:row+1,column,weight:weight+1},
            {row,column:column-1,weight:weight+1},
        ]

        for(let i = 0;i<neighbors.length;i++)
        {
            const nRow = neighbors[i].row;
            const nCol = neighbors[i].column;

            if(!isExplored(nRow,nCol))
            {
                continue;
            }

            let key = `${nRow}${nCol}`;
            if(founds.has(key))
                continue;
            

            founds.set(key,neighbors[i]);

            if(startNode.row == nRow && startNode.column == nCol)
                return {founded:true,founds};

            queue.push(neighbors[i]);
        }
    }
    return {founded:false};
}