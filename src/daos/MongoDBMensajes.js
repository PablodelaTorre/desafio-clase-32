import MongoClass from "../contenedores/MongoClass.js";
import { schemaMensajes } from "../models/mensajesSchema.js";

export class MongoDBMensajes extends MongoClass {
    constructor(){
        super("mensajes", schemaMensajes)
    }
}