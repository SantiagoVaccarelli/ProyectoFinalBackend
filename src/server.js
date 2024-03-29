const express = require('express');
const app = express();
const argv = require('minimist')(process.argv.slice(2), {default: {puerto:8080}, alias:{p:"puerto"}})
const { fork } = require('child_process')

// Archivo
// const ContenedorProducto = require('./daos/daoProductosArchivo')
// const ContenedorCarrito = require('./daos/daoCarritosArchivo')

// Firebase
// const ContenedorProducto = require('./daos/daoProductosFirebase')
// const ContenedorCarrito = require('./daos/daoCarritosFirebase')

// MongoDB
const ContenedorProducto = require('./daos/daoProductosMongoDB')
const ContenedorCarrito = require('./daos/daoCarritosMongoDB')

const contenedor = new ContenedorProducto();
const carrito = new ContenedorCarrito()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const isAdmin = true;

const routerProducts = express.Router();
const routerCart = express.Router();
const routerInfo = express.Router();
const routerRandoms = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use('/api/info', routerInfo);
app.use('/api/randoms', routerRandoms);

const adminMiddleware = app.use((req, res, next) => {
    isAdmin? next(): res.status(401).json({"error": "unauthorized"})
})

routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    product? res.status(200).json(product): res.status(400).json({"error": "product not found"})
})

routerProducts.post('/',adminMiddleware, async (req,res, next) => {
    const body = req.body;
    //body.timestamp = Date.now();   
    const newProductId = await contenedor.save(body);
    newProductId? res.status(200).json({"success" : "product added with ID: "+newProductId}): res.status(400).json({"error": "invalid key. Please verify the body content"})
})

routerProducts.put('/:id', adminMiddleware ,async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const wasUpdated = await contenedor.updateById(id,body);
    res.status(200).json({"success" : "product updated"})
})

routerProducts.delete('/:id', adminMiddleware, async (req, res, next) => {
    const id = req.params.id;
    await contenedor.deleteById(id);
    res.status(200).json({"success": "product successfully removed"})
})

routerCart.post('/', async(req, res) => {
    const body = req.body;
    body.timestamp = Date.now();
    for (let i = 0; body.products[i]; ) {
        body.products[i] = await contenedor.getById(body.products[i++])
    }
    const newCartId = await carrito.save(body);
    newCartId? res.status(200).json({"success" : "cart added with ID: "+newCartId}): res.status(400).json({"error": "invalid key. Please verify the body content"})
})

routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    res.status(200).json({"success": "cart successfully removed"})
})

routerCart.post('/:id/productos', async(req,res) => {
    const id = req.params.id;
    const body = req.body;
    const product = await contenedor.getById(body['id']);    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist? res.status(200).json({"success" : "product added"}): res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID in the body content is correct."})
    }
})

routerCart.get('/', async (req, res) => {
    const carritos = await carrito.getAll();
    res.status(200).json(carritos);
})

routerCart.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id);
    cart? res.status(200).json(cart): res.status(400).json({"error": "cart not found"})
})

routerCart.get('/:id/productos', async(req, res) => {
    const id= req.params.id;
    const cart = await carrito.getById(id)
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
})

routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists? res.status(200).json({"success" : "product removed"}): res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found"})
    }
})

routerInfo.get('/', (req, res)=>{
    const info = {
        argumentosDeEntrada: argv,
        sistemaOperativo: process.platform,
        nodeVersion: process.version,
        memoriaUsada: process.memoryUsage(),
        processId: process.pid,
        carpeta: process.cwd(),
        path: process.argv[1]
    } 
    res.json(info)
})

routerRandoms.get('/', (req, res)=>{
    const randomNumberFunction = fork('src/functions/randomNumber')    
    randomNumberFunction.on('message', (resultado) => {
        res.json(resultado);
    })
    randomNumberFunction.send(req.query.cant || 5000);
})

const PORT = argv.puerto || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${PORT}`)
})