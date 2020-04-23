import * as mutations from '../store/mutation';

const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

export default function (state = initalState, action) {
    switch (action.type) {
        case mutations.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case mutations.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };

        case mutations.LOGIN_SUCCESS:
        case mutations.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.data.token)
            return {
                ...state,
                user: action.payload.data.id,
                token: action.payload.data.token,
                isAuthenticated: true,
                isLoading: false,
            };

        case mutations.AUTH_ERROR:
        case mutations.LOGIN_FAIL:
        case mutations.LOGOUT_SUCCESS:
        case mutations.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };

        default:
            return state;
    }
}
