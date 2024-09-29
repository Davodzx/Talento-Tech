const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true,
    },
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    contraseña:{
        type:String,
        require: true
    },
    fechaCreacion:{
        type:Date,
        require: true
    },
    fechaModificacion:{
        type:Date,
        require:true
    }
})

const gastosSchema = new mongoose.Schema({
    // userID:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref: 'usersSchema'
    // },
    userId:{
        type: String,
        require: true
    },
    monto:{
        type:Number,
        require:true
    },
    categoria:{
        type:String,
        require: true
    },
    descripcion:{
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        require:true
    },
    metodo:{
        type:String,
        require:true
    }
})


module.exports.Users = mongoose.model("Users", usersSchema)
module.exports.Gastos = mongoose.model("gastos", gastosSchema)