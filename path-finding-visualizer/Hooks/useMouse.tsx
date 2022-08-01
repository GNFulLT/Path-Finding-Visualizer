import * as React from 'react'

interface MoveContextType
{
    //mousePressing:boolean
    setMousePressing:(arg0:boolean) => void
    getMousePressing : () => boolean
}


const MouseContext = React.createContext<MoveContextType >({} as MoveContextType);



const MouseProvider : React.FC<any> = ({children}) => 
{
   /*let mousePressing = false;
   let setMousePressing = (c :boolean)=>
   {
    mousePressing = c;
   }*/
    //const [mousePressing,setMousePressing] = React.useState<boolean>(false);

   React.useEffect(() =>{
    // @ts-ignore:next-line
    window.mousePressing = false;
   },[])
    const getMousePressing = ()=>
    {
        // @ts-ignore:next-line
        return window.mousePressing!;
    }

    const setMousePressing = (c:boolean) => 
    {
        // @ts-ignore:next-line
        window.mousePressing = c;
    }
    return(
        <MouseContext.Provider value={{getMousePressing,setMousePressing}}>
        {children}
        </MouseContext.Provider>
    );
}


export const useMouse = () => React.useContext(MouseContext);

export default MouseProvider;