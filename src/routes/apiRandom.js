import { Router } from "express";
import { fork } from "child_process";
import { logConsole } from "../../logger.js";
const router = Router()

router.get("/", (req, res) => {
    //http://localhost:3000/api/randoms?cant=1000
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    const cant = req.query.cant || 100000000;
    const child = fork("./src/getRandom.js");
    child.send(cant);
    child.on("message", (msg) => {
    res.send(msg);
    });

    child.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code);
    });
});


export default router;