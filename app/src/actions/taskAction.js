import axios from 'axios';
import * as mutation from '../store/mutation';
import { tokenConfig } from './authAction';

export const getTasks = () => (dispatch, getState) => {
    dispatch(setTaskLoading());
    axios.
        get('http://localhost:8080/api/tasks', {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        }).
        then(res => {
            dispatch({
                type: mutation.GET_TASKS,
                payload: res.data
            })
        }
        )
};

export const createNewTask = task => (dispatch, getState) => {

    axios.
        post('http://localhost:8080/api/tasks', task, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        }).
        then(res => {

            dispatch({
                type: mutation.CREATE_TASK,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
};

export const deleteTask = id => (dispatch, getState) => {
    axios.delete(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
            'token': `${localStorage.getItem('token')}`
        }
    }).
        then(res => {
            dispatch({
                type: mutation.DELETE_TASK,
                payload: id
            })
        })
};

export const updateDescription = task => dispatch => {
    dispatch(setTaskLoading());
    axios.put(`http://localhost:8080/api/tasks/${task.id}`, task, {
        headers: {
            'token': `${localStorage.getItem('token')}`
        }
    }).
        then(res => {
            dispatch({
                type: mutation.UPDATE_TASK,
                payload: task
            })
        })
};

export const updateTaskGroup = status => (dispatch) => {
    dispatch({
        type: mutation.UPDATE_TASK_STATUS,
        payload: status
    });
}

export const setTaskLoading = () => {
    return {
        type: mutation.TASKS_LOADING
    }
}
