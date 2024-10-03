//Variables y librerias
if (require.main === module) {
    //valida si el archivo es el principal para no cargar las variables de entorno en vercel
    require("dotenv").config(); //Carga las variables de entorno del archivo .en
  }
const express = require('express');  // importando express
const app = express();  //se crea instancia de express
const path = require("path")         // libreria para rutas de archivos estaticos
//const dotenv = require("dotenv");    //libreria para variable de entorno
const DataSchema = require("./schemas/schemas.js")  //importacion del diseño de Schemas para bases de datos
const mongoose = require("mongoose")  //libreria para mongoDb
const bodyParser = require("body-parser"); //libreria para archivos html  
const bcrypt = require("bcrypt")
const session = require("express-session")

//dotenv.config(); // Se realiza configuracion de la variable de entorno

app.use(express.json())  //Middleware para convertir datos json en javascript
const port = process.env.PORT// variable de puerto
const URI = process.env.URI   //variable de link de mongonodb
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized:true,
    cookie: {secure:false}
}))

//app.listen(port, ()=> console.log(`Server running on link http://localhost:${port}`))  //verificar que el servidor de exppress sirve

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
    const { userId } = req.query
    try{
        const gastos = await DataSchema.Gastos.find( {userId})

    if (gastos.length > 0 ){
        res.status(200).json({success:true, data:gastos})
    } 
    else{
        res.status(404).json({ success: false, message: "No se encontraron gastos para la cedula indicada"})
    }
}
    catch(error){
        console.error("Error al obtener mis gastos", error);
        //res.status(500).json({success:false, message:"Error al obtener los gastos"})
    }
})

app.put("/submit", async (req, res) => {
    const { gastoId, userId, monto, categoria, descripcion, fecha, metodo } = req.body;
    try {
        await DataSchema.Gastos.findByIdAndUpdate(gastoId, {
            userId,
            monto,
            categoria,
            descripcion,
            fecha,
            metodo
        });
        res.status(200).json({ success: true, message: "Gasto editado correctamente" });
    } catch (error) {
        console.error("Error al editar el gasto", error);
        res.status(500).json({ success: false, message: "Error al editar el gasto" });
    }
});

app.delete("/gastos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await DataSchema.Gastos.findByIdAndDelete(id);
        
        if (result) {
            res.status(200).json({ success: true, message: "Gasto eliminado correctamente" });
        } else {
            res.status(404).json({ success: false, message: "Gasto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar gasto:", error);
        res.status(500).json({ success: false, message: "Error al eliminar el gasto" });
    }
});





if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación
    });
  }

module.exports = app