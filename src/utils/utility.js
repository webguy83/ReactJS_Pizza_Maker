export const updateObjState = (state, newData) => {
    return {
        ...state,
        ...newData
    }
}

export const removeUnderscoreForSpace = (word) => {
    return word.replace(/_/g, " ");
}

export const checkIsValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}
