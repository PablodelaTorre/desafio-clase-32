import { Router } from "express";
import { logConsole } from "../../logger.js";
import { enviarMail } from "../controllers/registro.js";
import { enviarMensaje } from "../controllers/registro.js";
import nodemailer from "nodemailer"
import 'dotenv/config'
import twilio from "twilio";
//import passport from "passport";

const router = Router();

export const usuarios = []

router.get("/",async (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    res.render("./partials/registro");
});

// router.post('/',passport.authenticate('registro',{
//     failureRedirect:'./partials/errorRegistro',
//     succesRedirect:'./partials/login',
// }))
router.post("/",async (req, res) => {

    if (usuarios.some(usuario=>usuario.nombre===req.body.nombre)){
        return res.render("./partials/errorRegistro")
    }

    try {
        usuarios.push(req.body)
        // await enviarMail()
        // await enviarMensaje()
        res.render("./partials/login")
    } catch (error) {
        res.status(500)
    }
});

export default router;