import { useState, createContext, useEffect} from "react";
import Dashboard from "../reusable/dashboard";
export const UserContext = createContext()

const UsedContext = (props) => {

    const [details, setDetails] = useState({
        name:'',
        authToken:'',
        authlevel: ''
    })
    return(
        <UserContext.Provider value={{details, setDetails}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UsedContext;