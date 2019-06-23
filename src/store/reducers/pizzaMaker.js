import * as actionTypes from '../actions/actionTypes';

const initState = {
    ingredients: null,
    ingredientPrice: 0.99,
    totalPrice: 5.99,
    errorLoadingIngredients: false
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_INGREDIENT:
            const ingredients = [...state.ingredients]
            const ingredientObj = { ...state.ingredients[action.ingredientIndex] };
            let totalPrice;
            ingredientObj.purchased = !ingredientObj.purchased;
            ingredients[action.ingredientIndex] = ingredientObj;
            totalPrice = ingredientObj.purchased ? state.totalPrice + state.ingredientPrice : state.totalPrice - state.ingredientPrice;
            return { ...state, ingredients, totalPrice };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                errorLoadingIngredients: false,
                totalPrice: 5.99
            };
        case actionTypes.ERROR_LOADING_INGREDIENTS:
            return {
                ...state,
                errorLoadingIngredients: true
            }
        default:
            return state;
    }
}

export default reducers;