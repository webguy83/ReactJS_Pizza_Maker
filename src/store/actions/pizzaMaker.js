import * as actionTypes from './actionTypes';

export const toggleIngredient = (ingredientIndex) => {
    return {type: actionTypes.TOGGLE_INGREDIENT, ingredientIndex};
}