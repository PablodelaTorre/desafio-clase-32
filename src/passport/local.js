import passport from "passport";
import { Strategy } from "passport-local";
import { usuariosSchema } from '../models/UsuariosSchema.js'

const localStrategy = Strategy

passport.use('registro', new localStrategy({
    usernameField:'nombre',
    passwordField:'password',
    passReqToCallback:true
},async(req, nombre, password, done)=>{
    const usuarioBD = await Usuarios.findOne({nombre})
    if(usuarioBD){
        return done(null,false)
    }
    const usuarioNuevo = new Usuarios()
    usuarioNuevo.nombre = nombre
    usuarioNuevo.contrasena= password
    await usuarioNuevo.save()
    done(null,usuarioNuevo)
}))

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})

passport.deserializeUser(async(id,done)=>{
    const usuario = await Usuarios.findById(id)
    done(null,usuario)
})

passport.use('login', new localStrategy({
    usernameField:'nombre',
    passwordField:'password',
    passReqToCallback:true
},async(req, nombre, password, done)=>{
    const usuarioBD = await Usuarios.findOne({nombre})
    if(!usuarioBD){
        return done(null,false)
    }
    done(null,usuarioNuevo)
}))