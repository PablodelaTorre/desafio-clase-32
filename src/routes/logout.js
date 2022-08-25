import { Router } from "express";
import { destruirSesion } from "../controllers/logout.js";
import { logConsole } from "../../logger.js";

const router = Router();

router.get("/",async (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    const nombre = req.session.nombre;
    res.render("./partials/logout", { nombre });
    await destruirSesion(req)
});


export default router;