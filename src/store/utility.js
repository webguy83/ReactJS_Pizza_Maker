const updateObjState = (state, newData) => {
    return {
        ...state,
        ...newData
    }
}

export default updateObjState;