export default(state={}, action) => {
    switch (action.type) {
        case 'GET_IMGS':
            return {
                result: action.payload
            }
        default:
            return state;
    }
}