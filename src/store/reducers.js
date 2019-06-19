import * as actionTypes from './actions';

const initState = {
    ingredients: null,
    ingredientPrice: 0.99,
    totalPrice: 5.99
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INGREDIENTS:
            return { ...state, ingredients: action.defaultIngredients };
        case actionTypes.TOTAL_PRICE:
            return { ...state, totalPrice: action.totalPrice }
        default:
            return state;
    }
}

export default reducers;