import { GET_WARNING_MESSAGE } from "../actions";

const defaultState = {
    getWarningMessage: false
};

export default function users(state = defaultState, action) {
    switch (action.type) {
        case GET_WARNING_MESSAGE:
            return {
                ...state,
                getWarningMessage: true
            };

        default:
            return {
                ...state,
                getWarningMessage: false
            };
    }
}
