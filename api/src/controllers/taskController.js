
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
    const { user_id } = req.user;
    const {
        description, is_completed, due_date, task_group
    } = req.body;
    console.log(description, task_group, '----------------------');
    const created_on = moment(new Date()).format('L');

    if (empty(description)) {
        errorMessage.error = 'Description field is required';
        return res.status(status.bad).send(errorMessage);
    }
    const addTaskQuery = `INSERT INTO
          task(user_id, description, is_completed, task_group, due_date, created_date)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
        user_id,
        description,
        is_completed,
        task_group,
        due_date,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(addTaskQuery, values);
        const dbResponse = rows[0];

        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        return res.status(status.error).send('Unable to add task');
    }
};

/**
   * Get All Tasks
   * @param {object} req 
   * @param {object} res 
   * @returns {object} tasks array
   */
const getAllTasks = async (req, res) => {
    const { user_id } = req.user;

    const getAllTaskQuery = 'SELECT * FROM task WHERE user_id = $1 ORDER BY id DESC';
    try {
        const { rows } = await dbQuery.query(getAllTaskQuery, [user_id]);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            return res.status(status.success).send([]);
        }
        return res.status(status.success).send(dbResponse);
    } catch (error) {
        errorMessage.error = 'An error Occured';
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

        successMessage.data = {};
        if (!dbResponse) {
            successMessage.data.message = 'No record found';
            return res.status(status.success).send(successMessage);
        }
        successMessage.data.message = 'Task deleted successfully';
        return res.status(status.success).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Update a Task
 * @param {object} req
 * @param {object} res
 * @returns {object} updated task
 */

const updateTask = async (req, res) => {
    const { task_id } = req.params;
    const { user_id } = req.user;
    const {
        description, is_completed, due_date, task_group
    } = req.body;

    console.log('999999999999', due_date);
    if (empty(description)) {
        errorMessage.error = 'Description field is required';
        return res.status(status.bad).send(errorMessage);
    }

    const updateTaskQuery = `UPDATE task
        SET description = $1,
            is_completed = $2,
            due_date = $3,
            task_group = $4
        WHERE
            id = $5 AND user_id = $6 returning *`;

    try {
        const { rows } = await dbQuery.query(updateTaskQuery, [description, is_completed, due_date, task_group, task_id, user_id]);
        const dbResponse = rows[0];
        console.log(dbResponse)
        successMessage.data = {};
        if (!dbResponse) {
            successMessage.data.message = 'You have no task with that id';
            return res.status(status.success).send(errorMessage);
        }
        successMessage.data.message = 'Task updated successfully';
        return res.status(status.success).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
}

export {
    createTask,
    getAllTasks,
    deleteTask,
    updateTask,
};