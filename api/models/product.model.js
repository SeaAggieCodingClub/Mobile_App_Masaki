const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        load: {
            type: Number,
            required: true
        }  
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product