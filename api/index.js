require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route')
const userRouter = require('./routes/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/workouts', productRoute)
app.use(userRouter)


//console.log(process.env.MONG_URI)
mongoose.connect(process.env.MONG_URI)
.then(() => {
    console.log('Connected')
    app.listen(4000, () =>{
        console.log('Server is running on port', 4000)
    })
})
