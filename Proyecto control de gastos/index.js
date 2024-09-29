//Variables y librerias
const express = require('express');  // importando express
const path = require("path")         // libreria para rutas de archivos estaticos
const dotenv = require("dotenv");    //libreria para variable de entorno
const DataSchema = require("./schemas/schemas.js")  //importacion del diseño de Schemas para bases de datos
const mongoose = require("mongoose")  //libreria para mongoDb
const bodyParser = require("body-parser"); //libreria para archivos html
const { existsSync } = require('fs');

dotenv.config(); // Se realiza configuracion de la variable de entorno
const app = express();  //se crea instancia de express
app.use(express.json())  //Middleware para convertir datos json en javascript
const port = process.env.PORT // variable de puerto
const URI = process.env.URI   //variable de link de mongo
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.listen(port, ()=> console.log(`Server running on link http://localhost:${port}`))  //verificar que el servidor de exppress sirve

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

//conectando a la base de datos
mongoose.connect(URI).then(()=> console.log("Connected to my Database"))
.catch((error)=> console.error("error al conectar"))



app.post("/submit", async(req, res) =>{
    const {userId, monto, categoria, descripcion, fecha, metodo} = req.body
    try{
        const Gasto = DataSchema.Gastos({userId, monto, categoria, descripcion, fecha, metodo})
        await Gasto.save()
        res.status(201).json({success:true, message: "Gasto registrado correctamente"})
    }
    catch(error){
        console.log("Error", error)
    }
})

app.get("/gastos", async(req,res) =>{
    try{
        const gastos = await DataSchema.Gastos.find()
        res.status(200).json({success: true, data:gastos})
    }
    catch(error){
        console.error("Error al obtener mis gastos", error);
        res.status(500).json({success:false, message:"Error al obtener los gastos"})
    }
})