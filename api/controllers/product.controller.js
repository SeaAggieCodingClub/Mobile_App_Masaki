const Product = require('../models/product.model')
const Workout = require('../models/workout.model')
const Session = require('../models/session.model')

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Product.find({})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getWorkout = async (req, res) => {
    try {
        const {id} = req.params
        const workout = await Product.findById(id)
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//use this one to add the workout
const createWorkout = async (req, res) => {
    try {
        const {name, muscleGroup, muscle, description, equipment, difficulty, workoutType} = req.body
        const workout = await Workout({
            name, muscleGroup, muscle, description, equipment, difficulty, workoutType
        })
        await workout.save()
        res.json({success: true, message: 'workout added'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const updateWorkout = async (req, res) => {
    try {
        const {id} = req.params
        const workout = await Product.findByIdAndUpdate(id, req.body)
        if (!workout) {
            return res.status(404).json({message: "Workout not found"})
        }
        const updatedWorkout = await Product.findById(id)
        res.status(200).json(updatedWorkout)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params
        const workout = await Product.findByIdAndDelete(id)
        if (!workout) {
            res.status(404).json({message: 'Workout not found'})
        }
        res.status(200).json({message: 'Workout deleted successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addWorkoutSession = async (req, res) => {
    try {
        //workoutObject is an array
        const {name, daysOfSession, workoutObject} = req.body 
        for (const w of workoutObject) {
            const existingWorkout = await Workout.findOne({name: w.workout})
            if (!existingWorkout) {
                res.status(404).json({message: "workout not found"})
            }
        }
        const session = await Session ({
            name: name,
            daysOfSession: daysOfSession,
            workoutObject: workoutObject
        })
        await session.save()
        res.json({success: true, message: 'session added'})
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addWorkoutSession
}