const User = require('../models/user.model.js')

exports.createUser = async (req, res) => {
    const {fullname, username, password} = req.body
    const isNewUser = await User.isThisUsernameInUse(username)
    if (!isNewUser) {
        return res.json({success: false, message: 'This username is already in use'})
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
    
    if (username == '') {
        return res.json({success: false, message: 'Please enter your username'})
    } 
    if (password == '') {
        return res.json({success: false, message: 'Please enter your password'})
    }
    if (user == null){
        res.json({success: false, message: 'Invalid username or password'})
    } else {
        const result = await user.comparePassword(password)
        if (!result) {
            res.json({success: false, message: 'Invalid username or password'})
        } else {
            res.json({success: true, message: 'Signed-in successfully'})
        }
    }
}