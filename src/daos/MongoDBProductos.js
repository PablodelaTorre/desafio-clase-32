import MongoClass from "../contenedores/MongoClass";
import { schemaProductos } from "../models/ProductosSchema.js";

export class MongoDBProductos extends MongoClass {
    constructor() {
        super("productos", schemaProductos);
    }
}