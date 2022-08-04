import { Router } from "express";
import { usuarios } from "./registro.js";
//import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    res.render("./partials/login");
});

// router.post('/',passport.authenticate('login',{
//     failureRedirect:'./partials/errorLogin',
//     succesRedirect:'./partials/login',
// }))

router.post("/", (req, res) => {
    const {nombre, password} = req.body
    const usuario = usuarios.find(usuario=>usuario.nombre===nombre)
    if(usuario && usuario.password===password){
        for (const key in req.body){
            req.session[key] = req.body[key]
        }
        res.redirect('/')
    } else {
        res.render('./partials/errorLogin')
    }
    
    // const { nombre } = req.body;
    // console.log(nombre);
    // req.session.nombre = nombre;
    // res.redirect("/");
});


export default router;