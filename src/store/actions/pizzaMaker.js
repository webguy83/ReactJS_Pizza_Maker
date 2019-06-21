import * as actionTypes from './actionTypes';
import axios from '../../orders-axios';

export const toggleIngredient = (ingredientIndex) => {
    return { type: actionTypes.TOGGLE_INGREDIENT, ingredientIndex };
}
export const setIngredients = (ingredients) => {
    return { type: actionTypes.SET_INGREDIENTS, ingredients }
}

export const initIntredients = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then(res => {
                const ingredients = res.data.map(ing => { // convert ingredients array to an object form with type and purchased as keys
                    return {
                        type: ing,
                        purchased: false
                    }
                });
                dispatch(setIngredients(ingredients))
            })
            .catch(() => {
                dispatch({type: actionTypes.ERROR_LOADING_INGREDIENTS})
            })
    }
}