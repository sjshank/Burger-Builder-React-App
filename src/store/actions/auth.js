import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = (tokenData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenData: tokenData
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authCheck = () => {
    return dispatch => {
        const tokenId = localStorage.getItem("tokenId");
        const userId = localStorage.getItem("userId");
        if (!tokenId) {
            dispatch(logout());
        } else {
            if (tokenId && userId) {
                dispatch(authSuccess({ tokenId: tokenId, userId: userId }));
            }
        }
    }
}

export const authenticateUser = (uData) => {
    return dispatch => {
        dispatch(authStart());
        uData['returnSecureToken'] = true;
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpdnx388Hcq6umpi_p02YNib9p2vxZrlI";
        if (uData.isLoginAction) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpdnx388Hcq6umpi_p02YNib9p2vxZrlI";
        }
        axios.post(url, uData)
            .then(response => {
                localStorage.setItem("tokenId", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                dispatch(authSuccess({ tokenId: response.data.idToken, userId: response.data.localId }));
                // dispatch(authCheck());
            })
            .catch(failedRes => {
                dispatch(authFailure(failedRes.response.data.error));
            });
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem("tokenId");
        localStorage.removeItem("userId");
        dispatch(logout());
    }
}

