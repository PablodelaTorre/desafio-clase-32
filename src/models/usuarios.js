import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nombre:String,
    contraseña:String,
    correo:String
})

export default mongoose.model('usuarios',usuariosSchema)