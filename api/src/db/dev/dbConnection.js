import pool from './pool';

pool.on('connect', () => {
  console.log('Connected to db');
});

/**
 * Create User Table
 */

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    is_admin BOOL DEFAULT (false),
    created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Task Table
 * 
 *  TODO :unique desctiption
 */

const createTaskTable = () => {
  const taskCreateQuery = `CREATE TABLE IF NOT EXISTS task
  (id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    description VARCHAR(100) NOT NULL,
    is_completed BOOL DEFAULT false,
    due_date DATE NOT NULL,
    created_date DATE NOT NULL)`;
  pool.query(taskCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    });
};

/**
 * Drop User Table
 */

const dropUserTable = () => {
  const userDropQuery = 'DROP TABLE IF EXISTS users';

  pool.query(userDropQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Drop Task Table
 */

const dropTaskTable = () => {
  const taskDropQuery = 'DROP TABLE IF EXISTS task';

  pool.query(taskDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */

const createAllTables = () => {
  createUserTable();
  createTaskTable();
};

/**
 * Drop All Tables
 */

const dropAllTables = () => {
  dropUserTable();
  dropTaskTable();
};

pool.on('remove', () => {
  console.log('Client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables,
};
