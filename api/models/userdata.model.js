const mongoose = require('mongoose')

const UserDataSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        session: [{
            name: {
                type: String,
                required: true
            },
            daysOfSession: {
                type: [String],
                enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                required: true
            },
            //stores multiple workout sessions and dates of when workout is added
            workoutObject : [{
                workout: { //stores the name of the workout that refers to a workout in workout model. 
                    type: String,
                    required: true
                },
                sets: {
                    type: Number,
                    required: true
                },
                reps: {
                    type: Number,
                    required: true
                },
                weights: {
                    type: String,
                    required: true
                }
            }]
        }]
    },
    {
        timestamps: true
    }
)

const UserData = mongoose.model('UserData', UserDataSchema)

module.exports = UserData