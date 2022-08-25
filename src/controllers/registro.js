import 'dotenv/config'
import nodemailer from "nodemailer"
import twilio from "twilio"

const SENDINBLUE_PASS = process.env.SENDINBLUE_PASS
const SENDINBLUE_USER = process.env.SENDINBLUE_USER
const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN
const PHONE = process.env.PHONE



export async function enviarMail(req,res){
    try {
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

    } catch (error) {
        res.status(500)
    }

}


export async function enviarMensaje(){
    try {
        const twilioMessage = twilio(`${TWILIO_SID}`,`${TWILIO_TOKEN}`)
        twilioMessage.messages.create({
            body:'Hola, probando',
            from:'whatsapp:+12406963697',
            to:`whatsapp:${PHONE}`,
        })

    } catch (error) {
        res.status(500)
    }
}