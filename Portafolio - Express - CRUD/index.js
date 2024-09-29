const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const DataSchema = require("./schemas.js")
dotenv.config()

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const URI = process.env.URI;
console.log(URI)

mongoose.connect(URI).then(()=> console.log("Connected to my Database"))
.catch((error) => console.error("error al conectar"))

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.post("/submit", async (req,res) =>{
    const {name, email} = req.body
    try{
        const Datainfo = DataSchema({name, email});
        await Datainfo.save();
        res.send(`Formulario enviado! Nombre: ${name}, Email: ${email}`)
    }
    catch(error){
        console.log("Error", error)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor  http://localhost:${PORT}`);
})


