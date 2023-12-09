import LoginContext from "./LoginContext";
import {useEffect, useState} from "react";
const LoginProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, [])

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )

}

export default LoginProvider