

export function destruirSesion(req){
    req.session.destroy((err) => {
        if (!err) { 
            console.log("Session destroyed");
        } else {
            res.send({ status: "Error al borrar session" });
        }
    });  
}