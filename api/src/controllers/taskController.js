
import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    empty,
} from '../helpers/validations';


import {
    errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Task
   * @param {object} req
   * @param {object} res
   * @returns {object} 
   */
const createTask = async (req, res) => {
    const {
        user_id, description, is_completed, due_date
    } = req.body;

    const created_on = moment(new Date()).format('L');

    if (empty(description)) {
        errorMessage.error = 'Description field is required';
        return res.status(status.bad).send(errorMessage);
    }
    const addTaskQuery = `INSERT INTO
          task(user_id, description, is_completed, due_date, created_date)
          VALUES($1, $2, $3, $4, $5)
          returning *`;
    const values = [
        user_id,
        description,
        is_completed,
        due_date,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(addTaskQuery, values);
        const dbResponse = rows[0];

        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Unable to add task';
        return res.status(status.error).send(errorMessage);
    }
};

/**
   * Get All Tasks
   * @param {object} req 
   * @param {object} res 
   * @returns {object} tasks array
   */
const getAllTasks = async (req, res) => {
    const { is_admin, user_id } = req.user;

    if (!is_admin === true) {
        const getAllTaskQuery = 'SELECT * FROM task WHERE user_id = $1 ORDER BY id DESC';
        try {
            const { rows } = await dbQuery.query(getAllTaskQuery, [user_id]);
            const dbResponse = rows;
            if (dbResponse[0] === undefined) {
                errorMessage.error = 'There are no tasks';
                return res.status(status.notfound).send(errorMessage);
            }
            successMessage.data = dbResponse;
            return res.status(status.success).send(successMessage);
        } catch (error) {
            errorMessage.error = 'An error Occured';
            return res.status(status.error).send(errorMessage);
        }
    }

    const getAllTaskQuery = 'SELECT * FROM task ORDER BY id DESC';

    try {
        const { rows } = await dbQuery.query(getAllTaskQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'There are no tasks';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};


// Error in this task
/**
 * Get Tasks by status(is_complete)
 * @param {object} req
 * @param {object} res
 * @returns {object} tasks array
 */

const getTaskByStatus = async (req, res) => {
    const { status } = req.params;

    const findTaskQuery = 'SELECT * FROM task WHERE is_completed = $1 ORDER BY id DESC';

    try {
        const { rows } = await dbQuery.query(findTaskQuery, [status]);
        const dbResponse = rows;

        if (!dbResponse[0]) {
            errorMessage.error = 'No tasks available';
            return res.status(status.notfound).send(errorMessage);
        }
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
 * Delete a Task
 * @param {object} req
 * @param {object} res
 * @returns {void} return response task deleted successfully
 */

const deleteTask = async (req, res) => {
    const { task_id } = req.params;
    const { user_id } = req.user;

    const deleteTaskQuery = 'DELETE FROM task WHERE id = $1 AND user_id = $2 returning *';

    try {
        const { rows } = await dbQuery.query(deleteTaskQuery, [task_id, user_id]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'You have no task with that id';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Task deleted successfully';
        return res.status(status.success).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}
