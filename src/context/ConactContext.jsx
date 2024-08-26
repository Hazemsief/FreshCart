import { createContext, useState } from "react";

export const CounterContext = createContext(0);

export default function CounterContextProvider(props){
    const [Counter, setCounter] = useState(0)

    function Increment(){
        setCounter(Counter +1)
      }
    function Decrement(){
        setCounter(Counter -1)
      }


    return <CounterContext.Provider value ={ {Counter , Increment , Decrement} }>
        {props.children}
    </CounterContext.Provider>
}