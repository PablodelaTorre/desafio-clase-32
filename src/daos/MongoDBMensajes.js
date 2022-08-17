import MongoClass from "../contenedores/mongoClass.js";
import { schemaMensajes } from "../models/mensajesSchema.js";

export class MongoDBMensajes extends MongoClass {
    constructor(){
        super("mensajes", schemaMensajes)
    }
}