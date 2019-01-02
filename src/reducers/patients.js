import {
    GET_PATIENTS_TRACKING_LIST,
    GET_PATIENTS_TRACKING_LIST_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    patientsTrackingList: []
};

export default function patients(state = defaultState, action) {
    switch (action.type) {
        case GET_PATIENTS_TRACKING_LIST:
            return {
                ...state,
                isFetching: true
            };
        case GET_PATIENTS_TRACKING_LIST_SUCCESS:
            return {
                ...state,
                isFetching: true,
                patientsTrackingList: action.payload.patientsTrackingList
            };
        default:
            return {
                ...state
            };
    }
}
