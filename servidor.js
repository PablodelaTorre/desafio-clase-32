import express from 'express'
import { Server } from 'socket.io'
import session from "express-session";
import MongoStore from "connect-mongo";
import path from 'path';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
//import'./src/dataBases/database.js'
//import passport from 'passport';
import './src/passport/local.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { ioServer } from 'socket.io'
import http from 'http'
const app = express()
import multer from 'multer'
import desafioFaker from "./desafioFaker.js"
import routesProductos from "./src/routes/routes-productos.js"
import routesMensajes from "./src/routes/routes-mensajes.js"
import loginRouter from "./src/routes/login.js"
import logoutRouter from "./src/routes/logout.js"
import registroRouter from "./src/routes/registro.js"
import infoRoutes from "./src/routes/info.js"
import getRandom from "./src/routes/apiRandom.js"
import 'dotenv/config'
import passport from 'passport';
import compression from 'compression';
import { logWarn } from './logger.js';
import { logError } from './logger.js';
import { logConsole } from './logger.js';

// yargs 

const yarg = yargs(hideBin(process.argv))
const args = yarg.alias({m:'modo',p:'puerto',d:'debug'}).default({m:'prod', p:0, d:'false'}).boolean('d').argv
console.log(args)

//variables del env

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(multer({
    dest:__dirname+"/public/files",

}).single("photo"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

//login mongo

app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.krjoq.mongodb.net/${DB_NAME}retryWrites=true&w=majority`,
            ttl: 60 * 10 // 10 minutes
            })
    }
));
app.use('/api/productos-test',desafioFaker)
app.use('/productos', routesProductos)
app.use('/registro',registroRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/info',infoRoutes)
app.use('/api/random',getRandom)
//app.use(passport.initialize())
//app.use(passport.session())
app.set('views','./src/views')
app.set('view engine','ejs')

app.get('/',compression(),(req,res) => {
    if(req.session.nombre) {
        logConsole.info(`${req.url}`)
        logConsole.info(`${req.method}`)
        res.render('index', {
            title:"Agregue un producto",
            nombre: req.session.nombre
        })
    } else {
        res.redirect("/login");
    }
})

app.get('*', (req,res)=>{
    logWarn.warn(`URL inexistente ${req.url}`)
    res.send("URL inexistente")
})

// socket io

export const productos = []

export const mensajes = []

io.on('connection',(socket)=>{
    console.log('nuevo cliente conectado', socket.id)
    socket.emit('productos',productos)
    socket.emit('mensajes', mensajes)

    socket.on("newProducto", producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos)
    })

    socket.on('newMessage', mensaje => {
        mensajes.push(mensaje)
        io.sockets.emit('mensajes',mensajes)
    })
})

// const PORT = parseInt(process.argv[2]) || 8080
// app.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`)
// })


const PORT = parseInt(process.argv[2]) || 8080
    const server = httpServer.listen(process.env.PORT, () => {
    console.log(`servidor escuchando en el puerto ${process.env.PORT}`)
    // logConsole.info()
    // logConsole.warn()
    // logConsole.error("Error")
})
