import { normalize, denormalize ,schema } from "normalizr";
import {inspect} from 'util'
import { mensajes } from "./servidor";

const {autores} = mensajes

const autoresSchema = new schema.Entity('autores')

const mensajesSchema = new schema.Entity('mensajes',{
    autores:autoresSchema,
})

const mensajesNormalized = normalize(mensajes,mensajesSchema)

console.log("Data inicial", JSON.stringify(mensajes))
console.log("Data normalizada", JSON.stringify(mensajesNormalized))

function print(objeto){
    console.log(inspect(objeto,false,10,true))
}

print(mensajesNormalized)

const mensajesDenormalized = denormalize(mensajesNormalized.result,mensajesSchema,mensajesNormalized.entities)
console.log("Data desnormalizada", JSON.stringify(mensajesDenormalized))
print(mensajesDenormalized)