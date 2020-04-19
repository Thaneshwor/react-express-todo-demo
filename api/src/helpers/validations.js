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
