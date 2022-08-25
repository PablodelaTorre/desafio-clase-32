import { Router } from "express";
import { logConsole } from "../../logger.js";
import { loginUsuario } from "../controllers/login.js";
//import passport from "passport";

const router = Router();


router.get("/", (req, res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    res.render("./partials/login");
});

// router.post('/',passport.authenticate('login',{
//     failureRedirect:'./partials/errorLogin',
//     succesRedirect:'./partials/login',
// }))

router.post("/",async (req, res) => {
    await loginUsuario(req,res)
});


export default router;