import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerAction = (orderData, tokenId) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + tokenId, orderData)
            .then(response => {
                const parsedData = JSON.parse(response.data);
                dispatch(purchaseBurgerSuccess(parsedData.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error));
            });
    }
}



export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILURE,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (tokenData) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const qParams = '?auth=' + tokenData.tokenId + '&orderBy="userId"&equalTo="' + tokenData.userId + '"';
        axios.get('/orders.json' + qParams)
            .then(response => {
                let transfData = [];
                const keys = Object.keys(response.data);
                for (const key of keys) {
                    transfData.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                dispatch(fetchOrderSuccess(transfData))
            })
            .catch(error => {
                dispatch(fetchOrderFailure(error));
            });
    }
}