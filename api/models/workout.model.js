const mongoose = require('mongoose')

const WorkoutSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        muscle : {
            type: [String],
            enum: ['abductors', 'abs', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 
                'hip flexors', 'lats', 'lower back', 'upper back', 'neck', 'obliques', 'quads', 'shoulders', 'traps', 'triceps'],
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
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true
        },
        workoutType: {
            type: [String],
            enum: ['endurance', 'strength', 'cardio'],
            required: true
        } 
    },
    {
        timestamps: true
    }
)

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout