const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput (data) {
    let errors = {}

    //Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //I'm Validating the name 
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    //I'm validating the email field
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    } else if(!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email'
    }

    //I'm validating the password field
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password2 = 'Confirm Password is required'
    }
    
    if(!Validator.isLength(data.password, {min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 characters'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}