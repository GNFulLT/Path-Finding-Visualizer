import { WNode } from "./WNode"

export type ShortestFindResponse =
{
    founded:boolean,
    founds?:Map<string,WNode>
}