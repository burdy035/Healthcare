class Auth {
    isAuthenticated = () => {
        let userId = localStorage.getItem("userId");

        let userToken = localStorage.getItem("userToken");

        let user = localStorage.getItem("user");

        if (userId && userToken && user) {
            return true;
        } else {
            return false;
        }
    };
}

export default Auth;
