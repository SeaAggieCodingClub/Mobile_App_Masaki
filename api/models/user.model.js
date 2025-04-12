const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer,

    }
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err)  {
                return next(err)
            }
            this.password = hash;
            next();
        })       
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Error while comparing password', error.message)
    }
}

userSchema.statics.isThisUsernameInUse = async function (username) {
    try {
        const user = await this.findOne({username})
        if (user) {
            return false
        } else {
            return true
        }
    }
    catch (err) {
        console.log('error inside is ThisUsernameInUse method', err.message)
        return false
    }
    
}
module.exports = mongoose.model('User', userSchema)