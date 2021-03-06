import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
* isValidEmail helper method
* @param {string} email
* @returns {Boolean} True or False
*/
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
* validatePassword helper method
* @param {string} password
* @returns {Boolean} True or False
*/
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};

/**
* isEmpty helper method
* @param {string, integer} input
* @returns {Boolean} True or False
*/
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
 * Generate Token
 * @params {string} id
 * @returns {string} token
 */
const generateUserToken = (email, id, is_admin, first_name, last_name) => {

    const token = jwt.sign(
        {
            email,
            user_id: id,
            is_admin,
            first_name,
            last_name,
        },
        process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN }
    );
    return token;
};

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} hashed password
 */

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

export {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
    hashPassword,
};
