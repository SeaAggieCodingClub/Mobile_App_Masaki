const express = require('express')
const router = express.Router()
const {getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout, addWorkoutSession} = require('../controllers/product.controller')

router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)
router.post('/session', addWorkoutSession)

module.exports = router