export const updateObjState = (state, newData) => {
    return {
        ...state,
        ...newData
    }
}

export const removeUnderscoreForSpace = (word) => {
    return word.replace(/_/g, " ");
}