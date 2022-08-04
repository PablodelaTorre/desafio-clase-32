import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    const nombre = req.session.nombre;
    res.render("./partials/logout", { nombre });
    req.session.destroy((err) => {
        if (!err) { 
            console.log("Session destroyed");
        } else {
            res.send({ status: "Error al borrar session" });
        }
    });  
});


export default router;