const express = require('express')
const router = express.Router()
const {getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout} = require('../controllers/product.controller')

router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router