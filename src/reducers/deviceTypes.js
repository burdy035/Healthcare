import {
    GET_DEVICE_TYPES,
    GET_DEVICE_TYPES_SUCCESS,
    GET_DEVICE_TYPES_FAIL,
    ADD_DEVICE_TYPE,
    ADD_DEVICE_TYPE_FAIL,
    ADD_DEVICE_TYPE_SUCCESS,
    DELETE_DEVICE_TYPE,
    DELETE_DEVICE_TYPE_FAIL,
    DELETE_DEVICE_TYPE_SUCCESS
} from "../actions";

const initialStates = {
    isFetching: false,
    deviceTypeList: []
};

export default function searching(state = initialStates, action) {
    switch (action.type) {
        case GET_DEVICE_TYPES:
            return {
                ...state,
                isFetching: true
            };

        case GET_DEVICE_TYPES_SUCCESS:
            let temp = action.payload;
            let deviceTypeList = [];
            temp.map((item, index) => {
                return deviceTypeList.push({
                    ...item,
                    id: index,
                    isChecked: false
                });
            });

            return {
                ...state,
                isFetching: false,
                deviceTypeList: deviceTypeList
            };
        case GET_DEVICE_TYPES_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case ADD_DEVICE_TYPE:
            return {
                ...state,
                isFetching: true
            };
        case ADD_DEVICE_TYPE_SUCCESS:
            let addedTypes = action.payload.deviceTypes;
            return {
                ...state,
                isFetching: false,
                addTypeMessage: "Thêm loại thiết bị thành công",
                error: false,
                deviceTypeList: [...addedTypes, ...state.deviceTypeList]
            };
        case ADD_DEVICE_TYPE_FAIL:
            return {
                ...state,
                isFetching: false,
                addTypeMessage: "Có lỗi xảy ra" + action.error,
                error: true
            };

        case DELETE_DEVICE_TYPE:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_DEVICE_TYPE_FAIL:
            return {
                ...state,
                isFetching: false,
                deteleTypeMessage: "Có lỗi xảy ra" + action.error,
                error: true
            };
        case DELETE_DEVICE_TYPE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                deteleTypeMessage: "Xoá thành công",
                error: false,
                deviceTypeList: action.payload.deviceTypeList
            };
        default:
            return {
                ...state,
                deteleTypeMessage: "",
                addTypeMessage: "",
                error: false
            };
    }
}
