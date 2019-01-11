export const PATIENT_TRACKING = "PATIENT_TRACKING";

export const PATIENT_TRACKING_FAIL = "PATIENT_TRACKING_FAIL";

export const PATIENT_TRACKING_SUCCESS = "PATIENT_TRACKING_SUCCESS";

export const GET_AF_PREDICTION = "GET_AF_PREDICTION";

export const GET_AF_PREDICTION_SUCCESS = "GET_AF_PREDICTION_SUCCESS";

export const GET_AF_PREDICTION_FAIL = "GET_AF_PREDICTION_FAIL";

export const patientTracking = roomId => {
    return {
        type: PATIENT_TRACKING,
        payload: {
            roomId
        }
    };
};

export const doGetAFPRediction = values => {
    return {
        type: GET_AF_PREDICTION,
        payload: {
            values: values
        }
    };
};
