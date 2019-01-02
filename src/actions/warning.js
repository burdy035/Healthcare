export const WARNING_CONNECT = "WARNING_CONNECT";

export const WARNING_CONNECT_FAIL = "WARNING_CONNECT_FAIL";

export const WARNING_CONNECT_SUCCESS = "WARNING_CONNECT_SUCCESS";

export const GET_WARNING_MESSAGE = "GET_WARNING_MESSAGE";

export const doConnect = values => {
    return {
        type: WARNING_CONNECT,
        payload: values
    };
};

export const doGetWarningMessage = () => {
    return {
        type: GET_WARNING_MESSAGE
    };
};
