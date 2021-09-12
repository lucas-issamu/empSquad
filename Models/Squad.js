const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const squadSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    responsability:{
        type: String,
        default: ""
    },
    members: {
        type: [mongoose.ObjectId],
        default: []
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Squads", squadSchema)