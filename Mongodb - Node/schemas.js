const mongoose = require("mongoose")

const AnimeSchema = new mongoose.Schema({
    AnimeName:{
        type: String,
        require: true
    },
    Genre:{
        type: String,
        require: true
    },
    Chapters:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Anime", AnimeSchema);