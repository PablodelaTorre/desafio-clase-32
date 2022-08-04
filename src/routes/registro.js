import { Router } from "express";
//import passport from "passport";

const router = Router();

export const usuarios = []

router.get("/", (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    res.render("./partials/registro");
});

// router.post('/',passport.authenticate('registro',{
//     failureRedirect:'./partials/errorRegistro',
//     succesRedirect:'./partials/login',
// }))
router.post("/", (req, res) => {

    if (usuarios.some(usuario=>usuario.nombre===req.body.nombre)){
        return res.render("./partials/errorRegistro")
    }
    usuarios.push(req.body)
    res.render("./partials/login")
});


export default router;