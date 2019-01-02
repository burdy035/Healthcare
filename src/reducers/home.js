import {
    GET_MONTH_DUTIES,
    GET_MONTH_DUTIES_SUCCESS,
    GET_MONTH_DUTIES_FAIL
} from "../actions";

const defaultState = {
    duties: [],
    isFetching: false
};

export default function home(state = defaultState, action) {
    switch (action.type) {
        case GET_MONTH_DUTIES:
            return {
                ...state,
                isFetching: true
            };
        case GET_MONTH_DUTIES_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_MONTH_DUTIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                duties: action.payload.duties
            };
        default:
            return {
                ...state
            };
    }
}
