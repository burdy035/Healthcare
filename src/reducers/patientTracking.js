import {
    PATIENT_TRACKING_SUCCESS,
    PATIENT_TRACKING,
    GET_AF_PREDICTION,
    GET_AF_PREDICTION_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    patientTrackingConnect: "",
    gotPrediction: false
};

export default function patients(state = defaultState, action) {
    switch (action.type) {
        case PATIENT_TRACKING:
            return {
                ...state,
                isFetching: true
            };
        case PATIENT_TRACKING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                patientTrackingConnect: "success"
            };

        case GET_AF_PREDICTION:
            return {
                ...state,
                isFetching: true
            };
        case GET_AF_PREDICTION_SUCCESS:
            return {
                ...state,
                gotPrediction: true
            };
        default:
            return {
                ...state
            };
    }
}
