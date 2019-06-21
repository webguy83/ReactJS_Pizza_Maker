import * as actionTypes from '../actions/actionTypes';

const initState = {
    ingredients: [{ type: "pepperoni", purchased: false },
    { type: "mushroom", purchased: false },
    { type: "veggie", purchased: false },
    { type: "pineapple", purchased: false },
    { type: "olive", purchased: false }],
    ingredientPrice: 0.99,
    totalPrice: 5.99
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_INGREDIENT:
            const ingredients = [...state.ingredients]
            const ingredientObj = {...state.ingredients[action.ingredientIndex]};
            let totalPrice;
            ingredientObj.purchased = !ingredientObj.purchased;
            ingredients[action.ingredientIndex] = ingredientObj;
            totalPrice = ingredientObj.purchased ? state.totalPrice + state.ingredientPrice : state.totalPrice - state.ingredientPrice;
            return { ...state, ingredients, totalPrice };
        default:
            return state;
    }
}

export default reducers;