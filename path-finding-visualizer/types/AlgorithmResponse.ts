import { Node } from "./Node"

export type AlgorithmResponse =
{
    isFound:boolean
    endNode?:Node
    founds?:Node[]
}