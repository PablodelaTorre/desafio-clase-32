import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import 'dotenv/config'

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.krjoq.mongodb.net/${DB_NAME}retryWrites=true&w=majority`,
            }),
        cookie: {
            maxAge: 60000
        }
    }
));

app.set('views', './views');
app.set('view engine', 'ejs');

const getNombreSession = (req) => {
    console.log(req.session.nombreLogIn);
    return req.session.nombreLogIn? req.session.nombreLogIn : "Invitado";
}

app.get('/',(req,res) => {
    res.render('index', {
        title:"Agregue un producto"
    })
})


app.get("/session", (req, res) => {
    if(req.session.contador){
        req.session.contador ++
        res.send(`<h1>Hola ${getNombreSession(req)}.</h1>`)
    }else {
        console.log(req.session.nombre)
        req.session.nombreLogIn = req.query.nombre
        req.session.contador = 1
        res.send(`<h1>Bienvenido ${getNombreSession(req)}.</h1>`)
    } 
})

app.use('/olvidar', (req, res) => {
    const nombre = getNombreSession(req)
    req.session.destroy(err => {
            if(err){
                res.send(`<h1>Error al eliminar la sesión</h1>`)
            }else {
                res.send(`<h1>Hasta pronto ${nombre}</h1>`)
            }
        }
    )
})


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);