import { Router } from "express";
import { logConsole } from "../../logger.js";
import nodemailer from "nodemailer"
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
        // res.render("./partials/login")
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: 'delatorre.pablodaniel@gmail.com',
                pass: '1Y9IzpG8vgtH34O2'
            }
        });
    
        await transporter.sendMail({
            from:"Pablo de la Torre",
            to:"delatorre.pablodaniel@gmail.com",
            subject:"Nuevo Registro",
            html:`<h1>Nuevo Registro</h1>
                <p>Datos</p>
                <p>${req.body.email}</p>
                <p>${req.body.nombre}</p>
                <p>${req.body.telefono}</p>
            `,
        })
        res.send("Mail enviado con éxito")
    } catch (error) {
        res.status(500)
    }
    
});


export default router;