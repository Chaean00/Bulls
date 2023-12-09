export const RemoveData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("nickname")
}