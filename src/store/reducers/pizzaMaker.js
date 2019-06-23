import * as actionTypes from '../actions/actionTypes';
import updateObjState from '../utility';

const initState = {
    ingredients: null,
    ingredientPrice: 0.99,
    totalPrice: 5.99,
    errorLoadingIngredients: false
}

const toggleIngredients = (state, action) => {
    const ingredients = [...state.ingredients]
    const ingredientObj = { ...state.ingredients[action.ingredientIndex] };
    let totalPrice;
    ingredientObj.purchased = !ingredientObj.purchased;
    ingredients[action.ingredientIndex] = ingredientObj;
    totalPrice = ingredientObj.purchased ? state.totalPrice + state.ingredientPrice : state.totalPrice - state.ingredientPrice;
    return updateObjState(state, {
        ingredients,
        totalPrice
    })
}

const setIngredients = (state, action) => {
    return updateObjState(state, {
        ingredients: action.ingredients,
        errorLoadingIngredients: false,
        totalPrice: 5.99
    })
}

const errorLoadingIngredients = (state) => {
    return updateObjState(state, {
        errorLoadingIngredients: true
    });
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_INGREDIENT: return toggleIngredients(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.ERROR_LOADING_INGREDIENTS: return errorLoadingIngredients(state);
        default: return state;
    }
}

export default reducers;