import { GET_IMGS } from './actions';


export const getImgs = () => dispatch => {
    dispatch({
        type: GET_IMGS,
        payload: 'result of getting imgs test'
    })
}