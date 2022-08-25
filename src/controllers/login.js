import { usuarios } from "../routes/registro.js";


export function loginUsuario(req,res) {
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
}
