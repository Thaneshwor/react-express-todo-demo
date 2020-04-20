const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
};

/**
 * TODO: need to implement
 */
const task_statuses = {
    completed: 1.00,
    pending: 2.00,
}
export {
    successMessage,
    errorMessage,
    status,
    task_statuses,
};
