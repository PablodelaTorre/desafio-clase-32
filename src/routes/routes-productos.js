import { Router } from 'express'
import { productos } from '../../servidor.js'
import { productosDao as api } from '../daos/index.js';
import { logConsole } from '../../logger.js'
import { logError } from '../../logger.js'

const productosRouter = Router();

//mongodb

// productosRouter.get('/', async (req, res) => {
//     try{
//         const productos = await api.getAll();
//         productos? res.status(200).json(productos) : res.status(404).json({message: 'No hay productos disponibles'});
//     }catch (err){
//         res.status(500).json({message: err.message});
//     }
// });

// productosRouter.get('/:id', async (req, res) => {
//     try{
//         const producto = await api.getOne(req.params.id);
//         producto? res.status(200).json(producto) : res.status(404).json({message: 'Producto no encontrado. id: ' + req.params.id});
//     }
//     catch (err){
//         res.status(500).json({message: err.message});
//     }
// });

// productosRouter.post('/', async (req, res) => {
//     try{
//         const nuevoProducto = await api.create(req.body);
//         res.status(201).json({
//             message: 'Producto creado con éxito',
//             producto: nuevoProducto});
//     }catch (err){
//         res.status(500).json({message: err.message});
//     }
// });

// productosRouter.put('/:id', async (req, res) => {
//     try{
//         const productoActualizado = await api.update(req.params.id, req.body);
//         res.json({
//             message: 'Producto actualizado correctamente',
//             id: productoActualizado._id
//             });
//     }catch (err){
//         res.status(500).json({message: err.message});
//     }
// });

// productosRouter.delete('/:id', async (req, res) => {
//     try{
//         const productoBorrado = await api.delete(req.params.id);
//         res.json({
//             message: 'Producto borrado correctamente',
//             id: productoBorrado._id
//             });
//     }
//     catch (err){
//         res.status(500).json({message: err.message});
//     }
// });
    
//Con websocket

class Container {
    constructor(){
    }
    productos = []

    guardarP(nuevoProd,file){
        let id = 0
        if(this.productos.length === 0){
            id = 1
        } else {
            id = this.productos[this.productos.length-1].id + 1
        }

        let productoNuevo = {
            'id': id,
            'title': nuevoProd.title,
            'price': nuevoProd.price,
            'photo': file
        }

        this.productos.push(productoNuevo)
    }

    devolverP(){
        return this.productos
    }

    devolverPrId(num){
        const producto = this.productos.find(p => p.id == Number(num))
        return producto
    }

    actualizarP(id,product){
        let index = this.productos.findIndex(p => p.id == id)
        if(index >=0){
            this.productos[index] = product
        } else {
            console.log('Producto no encontrado')
        }
    }

    deleteP(num){
        this.productos = this.productos.filter(p => p.id !== Number(num))
    }
}

const containerProductos = new Container()

// router.get('/', (req,res) => {
//     products = containerProductos.devolverP()
//     res.json({products})
// })

productosRouter.get('/',(req,res) => {
    logConsole.info(`${req.url}`)
    logConsole.info(`${req.method}`)
    logError.error('Error')
    const products = containerProductos.devolverP()
    res.render('./partials/productos.ejs', {
        title:"Agregue un producto",
        products
    })
})

productosRouter.get('/:id',(req,res) => {
    const { id } = req.params;
    const product = containerProductos.devolverPrId(id)
    product ? res.json({product}) : res.json({message: 'Producto no encontrado. Id: '+ id});
})

productosRouter.post('/', (req,res) => {
    let producto = req.body
    const photo = req.file.filename
    containerProductos.guardarP(producto,photo)
    res.json({mensaje:"Producto agregado con éxito"})
})

productosRouter.put('/:id', (req,res) => {
    const { id } = req.params
    const { body } = req
    const product = containerProductos.devolverPrId(id)
    product? containerProductos.actualizarP(id,body) : res.json({message: 'Producto no encontrado'})
    res.json({message: 'Producto actualizado'})
})

productosRouter.delete('/:id', (req,res) => {
    const { id } = req.params;
    containerProductos.deleteP(id)
    res.json({mensaje:"producto eliminado con éxito"})
})

export default productosRouter