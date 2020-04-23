import * as mutations from '../store/mutation';
import { returnErrors } from './errorAction';
import axios from 'axios';

// Register User
export const register = ({ email, firstName, lastName, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, firstName, lastName, password })

    axios.post('http://localhost:8080/api/auth/signup', body, config)
        .then(res => dispatch({
            type: mutations.REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: mutations.REGISTER_FAIL
            });
        });

}


// Login user
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password })

    axios.post('http://localhost:8080/api/auth/signin', body, config)
        .then(res => dispatch({
            type: mutations.LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch({
                type: mutations.LOGIN_FAIL
            });
        });

}

// User Logout
export const logout = () => dispatch => {
    dispatch({
        type: mutations.LOGOUT_SUCCESS
    })
}
