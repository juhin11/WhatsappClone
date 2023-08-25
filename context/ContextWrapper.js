import React, { useState } from "react";
import Context from './Context'
// import {}

export default function ContextWrapper(props){

    const [loggedInUserData,setLoggedInUserData] = useState({
        id: 'UserID',
        email:'User@xyz.com',
        reciverid:'reciverID',
        reciverEmail:'reaciver@xyz.com'
    })

    return(
        <Context.Provider value={[loggedInUserData,setLoggedInUserData]}>
            {props.children}
        </Context.Provider>
    )
}