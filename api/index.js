const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/workouts', productRoute)
require('dotenv').config()

const mongoUrl = process.env.MONG_URI

mongoose.connect(mongoUrl)
.then(() => {
    console.log('Connected')
    app.listen(process.env.PORT, () =>{
        console.log('Server is running on port', process.env.PORT)
    })
})
