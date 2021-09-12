const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const employeeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    squad: {
        type: String,
        default: ""
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Employee", employeeSchema);
