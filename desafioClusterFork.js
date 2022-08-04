import os from 'os' 
import cluster from 'cluster'

//fork o cluster

if(cluster.isMaster){
    const cantidadCPUs = os.cpus().length
    console.log('Master')
    for (let i = 0; i < cantidadCPUs; i++ ){
        cluster.fork()
    }
} else {
    app.listen(8080,()=>{
        console.log("Servidor conectado")
    })
}