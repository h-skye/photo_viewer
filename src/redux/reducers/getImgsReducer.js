import {
    GET_IMGS_ASYNC_SUCCESS,
    GET_IMGS_ASYNC_FAILURE
} from '../actions/action-types'

const initialState = {
    images: [],
    error: null
};

export default function getImgsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_IMGS_ASYNC_SUCCESS:
            return {
                ...state,
                images: action.payload
            };
        
        case GET_IMGS_ASYNC_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}