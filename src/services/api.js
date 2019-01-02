import axios from "axios";
import {} from "redux-saga/effects";

const apiPrefix = process.env.REACT_APP_API_URL;

export const callApi = function*(method, uStr, params = {}) {
    let response = {};

    let token = localStorage.getItem("userToken");
    let userId = localStorage.getItem("userId");

    let headers = {
        "x-token": token,
        "user-id": userId
    };

    params.userId = userId;

    try {
        let url = ``;
        if (method === "get") {
            url = `${apiPrefix}/${uStr}?${encodeQueryData(params)}`;
            response = yield axios({
                url,
                method: method,
                headers
            });
        } else {
            url = `${apiPrefix}/${uStr}`;

            response = yield axios({
                url,
                method: method,
                data: params,
                headers
            });
        }

        return response.data;
    } catch (error) {
        return {
            error: error.message
        };
    }
};

const encodeQueryData = data => {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
};
