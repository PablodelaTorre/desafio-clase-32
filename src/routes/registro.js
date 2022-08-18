import { Router } from "express";
import { logConsole } from "../../logger.js";
import nodemailer from "nodemailer"
import 'dotenv/config'
import twilio from "twilio";
//import passport from "passport";

const router = Router();

export const usuarios = []

const SENDINBLUE_PASS = process.env.SENDINBLUE_PASS
const SENDINBLUE_USER = process.env.SENDINBLUE_USER
const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN
const PHONE = process.env.PHONE

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
                user: `${SENDINBLUE_USER}`,
                pass: `${SENDINBLUE_PASS}`
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

        const twilioMessage = twilio(`${TWILIO_SID}`,`${TWILIO_TOKEN}`)
        twilioMessage.messages.create({
            body:'Hola, probando',
            from:'whatsapp:+12406963697',
            to:`whatsapp:${PHONE}`,
        })

        res.send("Mail enviado con éxito")

    } catch (error) {
        res.status(500)
    }
});


export default router;