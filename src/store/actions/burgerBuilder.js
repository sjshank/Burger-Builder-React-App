import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingrediens) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingrediens
    }
}

export const initIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS
    }
}

export const initIngredient = (name) => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(initIngredientsFailed());
            });
    }
}

