export const GET_PATIENTS_TRACKING_LIST = "GET_PATIENTS_TRACKING_LIST";

export const GET_PATIENTS_TRACKING_LIST_FAIL =
    "GET_PATIENTS_TRACKING_LIST_FAIL";

export const GET_PATIENTS_TRACKING_LIST_SUCCESS =
    "GET_PATIENTS_TRACKING_LIST_SUCCESS";

export const getPatientsTrackingList = () => {
    return {
        type: GET_PATIENTS_TRACKING_LIST
    };
};
