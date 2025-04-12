const {check, validationResult} = require('express-validator')

exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty().withMessage('Please enter your fullname')
    .isAlpha('en-US', { ignore: ' ' }).withMessage('Name must contain only letters')
    .isLength({min: 3, max: 30}).withMessage('Name must be between 3 to 30 characters'),

    check('username').trim().not().isEmpty().withMessage('Please enter your username')
    .isLength({min: 3, max: 20}).withMessage('Username must be between 3 to 20 characters')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

    check('password').trim().not().isEmpty().withMessage('Please enter your password')
    .isLength({min: 8, max: 20}).withMessage('Password must be between 8 to 20 characters')   
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) {
        return next()
    } else {
        const error = result[0].msg
        res.json({success: false, message: error})
    }
}