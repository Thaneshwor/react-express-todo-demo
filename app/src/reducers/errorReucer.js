import { GET_ERRORS, CLEAR_ERRORS } from '../store/mutation';

const inintalState = {
    msg: {},
    status: null,
    id: null,
}


export default function (state = inintalState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null,
            };

        default:
            return state;
    }
}
