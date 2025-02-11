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
    res.json(user)
}