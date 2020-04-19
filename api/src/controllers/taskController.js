
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

