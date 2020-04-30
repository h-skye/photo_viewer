import buildQueryString from '../../util/build-query-string';
import {
    GET_IMGS_ASYNC_SUCCESS,
    GET_IMGS_ASYNC_FAILURE
} from './action-types';

export const getImgsAsync = () => (dispatch, getState) => {
    const { filters } = getState();

    const queryString = buildQueryString(filters || {})

    return fetch(`/images${queryString}`)
        .then((response) => {
            response.json()
                .then((resultJSON) => {
                    const imgUrls = resultJSON.map((value) => value.url);
                    return dispatch(getImgsAsyncSuccess(imgUrls));
                })
        })
        .catch((error) => {
            return dispatch(getImgsAsyncFailure(error))
        });
};

export const getImgsAsyncSuccess = imgUrls => ({ type: GET_IMGS_ASYNC_SUCCESS, payload: imgUrls });

export const getImgsAsyncFailure = error => ({ type: GET_IMGS_ASYNC_FAILURE, payload: error })