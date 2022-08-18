import dotenv from 'dotenv';
dotenv.config();
let productosDao
let carritosDao
let mensajesDao

switch (process.env.DB_CONNECTION) {
    case 'mongoDB':
        import('./MongoDBProductos.js').then(({MongoDBProductos})=>{
            productosDao = new MongoDBProductos();
        })
        import("./MongoDBCarritos.js").then(({ MongoDBCarritos }) => {
            carritosDao = new MongoDBCarritos();
        })
        import('./MongoDBMensajes.js').then(({MongoDBMensajes})=>{
            mensajesDao = new MongoDBMensajes();
        })
    }

export { productosDao , mensajesDao }