import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tokenData: null,
    loading: false,
    error: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                tokenData: null,
                error: {}
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                tokenData: action.tokenData,
                error: {},
                loading: false
            };
        case actionTypes.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                tokenData: null
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loading: false,
                error: {},
                tokenData: null
            };
        default:
            return state;
    }

}

export default reducer;