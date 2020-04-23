import * as mutations from '../store/mutation';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    console.log(msg, JSON.stringify(status));
    return {
        type: mutations.GET_ERRORS,
        payload: { msg, status, id }
    };
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: mutations.CLEAR_ERRORS
    };
};