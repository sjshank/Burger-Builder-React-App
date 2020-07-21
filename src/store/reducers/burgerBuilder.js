import * as actionTypes from "../actions/actionTypes";

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    ingredients: null,
    totalPrice: 0,
    loading: true
}

const INCREDIENTS_PRICE = {
    'salad': 2,
    'meat': 10,
    'cheese': 0.5,
    'bacon': 3.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.INIT_INGREDIENTS_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }

}

const addIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INCREDIENTS_PRICE[action.ingredientName]
    };
};

const removeIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice > 0 ? state.totalPrice - INCREDIENTS_PRICE[action.ingredientName] : 0
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 0,
        loading: false
    };
};

export default reducer;