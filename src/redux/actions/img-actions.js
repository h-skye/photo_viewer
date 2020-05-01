import buildQueryString from '../../util/build-query-string';
import {
    GET_IMGS_ASYNC_SUCCESS,
    GET_IMGS_ASYNC_FAILURE
} from './action-types';

export const getImgsAsync = () => (dispatch, getState) => {
    const { filters } = getState();

    const queryString = buildQueryString(filters || {})
    const imgToken = '?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTg4MzU3MDQ2LCJleHAiOjE1ODgzNjA2NDYsImF1ZCI6InVzZXJAZ21haWwuY29tIiwiaXNzIjoiWVlIIn0.aOydlK6UNojnWTqY_oLwNQKqO1SDFZ9ucypiqRGqR65eSfeAConnr9ZkTAiFJHVQQCkYhkdwEw8S5x9H9dEjTw'

    // img token ?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTg4MzU3MDQ2LCJleHAiOjE1ODgzNjA2NDYsImF1ZCI6InVzZXJAZ21haWwuY29tIiwiaXNzIjoiWVlIIn0.aOydlK6UNojnWTqY_oLwNQKqO1SDFZ9ucypiqRGqR65eSfeAConnr9ZkTAiFJHVQQCkYhkdwEw8S5x9H9dEjTw

    // return fetch(`/images${queryString}`) // query string not building right
    return fetch(`/images${imgToken}`) // manually using token query
        .then((response) => {
            console.log(response)
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