const express = require('express')
const router = express.Router()
const {createUser, checkUser} = require('../controllers/user')
const {validateUserSignUp, userValidation} = require('../middlewares/validation/user')

router.post('/create-user', validateUserSignUp, userValidation, createUser)
router.post('/check-user', checkUser)
module.exports = router
