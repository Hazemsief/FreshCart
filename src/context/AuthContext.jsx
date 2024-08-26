import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)


export default function AuthContextProvider(props){
    const [accessToken, setaccessToken] = useState(null)


    useEffect(() => {
      
        if(localStorage.getItem('accessToken') !== null)
            {
                setaccessToken(localStorage.getItem('accessToken'))
            }
    }, [] );
    
 
    return <AuthContext.Provider value={ { accessToken, setaccessToken } }>
        {props.children}    
    </AuthContext.Provider>
}   
