import { Router } from "express";
import routesProductos from "./routes-productos.js"
import routesMensajes from "./routes-mensajes.js"
import loginRouter from "./login.js"
import logoutRouter from "./logout.js"
import registroRouter from "./registro.js"
import infoRoutes from "./info.js"
import getRandom from "./apiRandom.js"

const appRouter = Router()


appRouter.use('/productos', routesProductos)
appRouter.use('/registro',registroRouter)
appRouter.use('/login',loginRouter)
appRouter.use('/logout',logoutRouter)
appRouter.use('/info',infoRoutes)
appRouter.use('/api/random',getRandom)


export default appRouter;