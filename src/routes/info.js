import { Router } from "express";
import process from 'process'
import os from 'os'
import compression from "compression";
import { logConsole } from "../../logger.js";

const router = Router();

const proceso = {"Directorio de ejecución":process.cwd(),"ID del proceso":process.pid,"Node version":process.version,"Memoria total reservada":process.memoryUsage(),"Plataforma":process.platform,"Path de ejecución":process.execPath,"Argumentos de entrada":process.argv,"Número de procesadores":os.cpus().length}

// router.get("/", (req, res) => {
//     logConsole.info(`${req.url}`)
//     logConsole.info(`${req.method}`)
//     res.send({proceso});
// });

router.get("/", compression(),(req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    res.send({proceso});
});

export default router;