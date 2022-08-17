import MongoClass from "../contenedores/mongoClass.js";
import { schemaProductos } from "../models/productosSchema.js";

export class MongoDBProductos extends MongoClass {
    constructor() {
        super("productos", schemaProductos);
    }
}