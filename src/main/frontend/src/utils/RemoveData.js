export const RemoveData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("loggedIn")
}