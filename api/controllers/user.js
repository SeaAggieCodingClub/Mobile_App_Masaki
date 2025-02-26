const User = require('../models/user.model.js')

exports.createUser = async (req, res) => {
    const {fullname, username, password} = req.body
    const isNewUser = await User.isThisUsernameInUse(username)
    if (!isNewUser) {
        return res.json({success: false, message: 'This username is already in use, try sign-in again'})
    }
    const user = await User({
        fullname,
        username, 
        password
    })
    await user.save()
    res.json({success: true, message: 'Successfully registered :)'})
}

exports.checkUser = async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username: username})
    if (user == null) {
        res.json(false)
    } else {
        const result = await user.comparePassword(password)
        res.json(result)
    }
}