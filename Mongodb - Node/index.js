//librerias
const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const AnimeSchema = require("./schemas.js")
dotenv.config()
//configuracion de metodos y variables
const app = express();
const port = 3000;
app.use(express.json())



//prueba de que hay conexion entre puerto y api
app.listen(port, () => console.log("Server listing on port,", port))

//prueba api localhost
app.get("/", (req, res) =>{
    res.send("Welcome to my new API")
})


//conexion mongoose
const URI = process.env.URI;
console.log(URI)
mongoose
    .connect(URI)
    .then(()=> console.log("Connected to MongoDB Server"))
    .catch((error) => console.error("error conectando a mongo"))


//publico info
app.post("/Anime", async(req, res) =>{
    try{
        const AnimeData = AnimeSchema(req.body);
        AnimeData.
            save().
            then((data) => res.json(data))
    }
    catch(error){
        console.log("Error", error)
    }

})
//obtengo todos los usuarios
app.get("/Anime", async(req, res) =>{
    try{
        AnimeSchema
            .find()
            .then((data) => res.json(data))
    }
    catch(error){
        console.log("Error", error)
    }
})

//especificar usuario a buscar
app.get("/Anime/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        AnimeSchema
            .findById(id)
            .then((data) => res.json(data))
    }
    catch(error){
        console.log("Error", error)
    }
})

//update data
app.put("/Anime/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        const { AnimeName, Genre, Chapters} = req.body
        AnimeSchema
            .updateOne({_id: id}, {$set: {AnimeName, Genre, Chapters}})
            .then((data) => res.json(data))
    }
    catch(error){
        console.log("Error", error)
    }
})

//delete info
app.delete("/Anime/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        const result = await AnimeSchema.deleteOne({ _id : id})       
        console.log(result) 
    }
    catch(error){
        console.log("Error", error)
    }
})