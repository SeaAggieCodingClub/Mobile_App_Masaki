const Product = require('../models/product.model')

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

const createWorkout = async (req, res) => {
    try {
        const workout = await Product.create(req.body)
        res.status(200).json(workout)
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

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}