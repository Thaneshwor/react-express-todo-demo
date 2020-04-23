import * as mutations from '../store/mutation';

const initalState = {
    tasks: [],
    loading: false,
    task_status: 'To Do'
}

export default function (state = initalState, action) {
    switch (action.type) {
        case mutations.GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case mutations.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case mutations.CREATE_TASK:
            return {
                ...state,
                tasks: [action.payload.data, ...state.tasks]
            };
        case mutations.UPDATE_TASK:
            return {
                ...state,/// block
                tasks: state.tasks.map(task => {
                    return (task.id == action.payload.id) ?
                        {
                            ...task,
                            description: action.payload.description,
                            is_completed: action.payload.is_completed,
                            task_group: action.payload.task_group,
                            due_date: action.payload.due_date

                        } :
                        task
                })
            };

        case mutations.UPDATE_TASK_STATUS:
            return {
                ...state,
                task_status: action.payload
            }

        case mutations.TASKS_LOADING:
            return {
                ...state,
                loading: true
            }


        default:
            return state;
    }
}
