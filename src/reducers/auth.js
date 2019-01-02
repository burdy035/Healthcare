import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_AUTHENTICATED,
    USER_UNAUTHENTICATED,
    INVALID_TOKEN
} from "../actions";

const initialStates = {
    isFetching: false,
    isLoggedIn: "",
    user: {},
    loginError: "",
    loginSuccess: false,
    invalidToken: false
};

export default function auth(state = initialStates, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: true,
                loginError: ""
            };
        case LOGIN_SUCCESS:
            let user = action.payload.user;

            localStorage.setItem("userId", `${user._id}`);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userToken", `${user.token}`);

            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                loginSuccess: true,
                user: action.payload.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                loginSuccess: false,
                loginError: action.error
            };
        case USER_AUTHENTICATED:
            return {
                ...state,
                userId: action.payload.userId,
                token: action.payload.token,
                isLoggedIn: true,
                user: action.payload.user
            };
        case USER_UNAUTHENTICATED:
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            return {
                ...state,
                isLoggedIn: false
            };
        case INVALID_TOKEN:
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");

            return {
                ...state,
                isLoggedIn: false,
                invalidToken: true
            };
        default:
            return {
                ...state,
                invalidToken: false
            };
    }
}
