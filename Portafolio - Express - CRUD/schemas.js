const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Data", DataSchema);