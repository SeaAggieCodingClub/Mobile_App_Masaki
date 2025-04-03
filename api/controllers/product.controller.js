const Product = require('../models/product.model')
const Workout = require('../models/workout.model')
const Session = require('../models/session.model')
const UserData = require('../models/userdata.model')
const User = require('../models/user.model')

//retrieves all the workouts (one time)
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

//obsolete
const getWorkout = async (req, res) => {
    try {
        const {id} = req.params
        const workout = await Product.findById(id)
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//obsolete
const getSession = async (req, res) => {
    try {
        const sessions = await Session.find({})
        res.status(200).json(sessions)
    } catch (error) {
        res.status(500).json({success: true, message: error.message})
    }
}

//use this one to add the workout (admin)
const createWorkout = async (req, res) => {
    try {
        const {name, muscle, description, equipment, difficulty, workoutType} = req.body
        const workout = await Workout({
            name, muscle, description, equipment, difficulty, workoutType
        })
        await workout.save()
        res.json({success: true, message: 'workout added'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

//admin
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
//admin
const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params
        const workout = await Product.findByIdAndDelete(id)
        if (!workout) {
            res.status(404).json({message: 'Workout not found'})
        }
        res.status(200).json({success: true, message: 'Workout deleted successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// obsolete
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

//Important
const loadData = async (req, res) => {
    try {
        const {username, session} = req.body
        const verifyUsername = await User.findOne({username: username})
        const replaceUser = await UserData.findOne({username: username})
        if (!verifyUsername) {
            res.status(404).json({success: false, message: 'username not found'})
        }
        for (const w of session) {
            const whatever = await w.workoutObject
            for (const l of whatever) {
                const existingWorkout = await Workout.findOne({name: l.workout})
                if (!existingWorkout) {
                    res.status(404).json({success: false, message: "workout not found"})
                }
            }
        }
        //replacing data if the username was already saved in the userData schema
        if (replaceUser) {
            await UserData.updateOne(
                {
                    username: username,
                },
                {
                    $set: {session: session}
                }
            )
        } else {
            const data = await UserData ({
                username: username,
                session: session
            })
            data.save()
        }
        res.json({success: true, message: "sessions loaded successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addWorkoutSession,
    getSession,
    loadData
}