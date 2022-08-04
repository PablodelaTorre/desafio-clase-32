import dotenv from 'dotenv';
dotenv.config();
let productosDao
let mensajesDao

switch (process.env.DB_CONNECTION) {
    case 'mongoDB':
        import('./MongoDBProductos.js').then(({MongoDBProductos})=>{
            productosDao = new MongoDBProductos();
        })
        import('./MongoDBMensajes.js').then(({MongoDBMensajes})=>{
            mensajesDao = new MongoDBMensajes();
        })
    }

export { productosDao , mensajesDao }