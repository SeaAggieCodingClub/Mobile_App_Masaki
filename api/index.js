require('dotenv').config({ path: "private.env"})
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

const dns = "https://www.duckdns.org/update?domains=fitnessapp&token=" + process.env.DUCK_TOKEN

async function updateDNS() {
    try {
        const response = await fetch(dns)
        console.log("DNS: " + await response.text())
    } catch (error) {
        console.log("DNS error")
    }
}

updateDNS()