const mongoose = require('mongoose')

const WorkoutSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        muscleGroup: {
            type: String,
            required: true
        },
        muscle : {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        equipment: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        workoutType: {
            type: [String],
            enum: ['Endurance', 'Strength', 'Cardio'],
            required: true
        } 
    },
    {
        timestamps: true
    }
)

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout