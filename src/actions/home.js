export const GET_MONTH_DUTIES = "GET_MONTH_DUTIES";

export const GET_MONTH_DUTIES_FAIL = "GET_MONTH_DUTIES_FAIL";

export const GET_MONTH_DUTIES_SUCCESS = "GET_MONTH_DUTIES_SUCCESS";

export const doGetDuties = month => {
    return {
        type: GET_MONTH_DUTIES,
        payload: {
            month
        }
    };
};
