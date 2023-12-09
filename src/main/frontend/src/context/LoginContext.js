import { createContext } from "react";

const LoginContext = createContext({
    loggedIn: false, // false -> 로그인 X, true -> 로그인 O
    setLoggedIn: () => {}
});

export default LoginContext;
