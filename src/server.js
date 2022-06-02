const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const isAdmin = true;

const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

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
    body.timestamp = Date.now();   
    const newProductId = await contenedor.save(body);
    newProductId? res.status(200).json({"success" : "product added with ID: "+newProductId}): res.status(400).json({"error": "invalid key. Please verify the body content"})
})

routerProducts.put('/:id', adminMiddleware ,async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const wasUpdated = await contenedor.updateById(id,body);
    wasUpdated? res.status(200).json({"success" : "product updated"}): res.status(404).json({"error": "product not found"})
})


routerProducts.delete('/:id', adminMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const wasDeleted = await contenedor.deleteById(id);
    wasDeleted? res.status(200).json({"success": "product successfully removed"}): res.status(404).json({"error": "product not found"})
})

routerCart.post('/', async(req, res) => {
    const body = req.body;
    body.timestamp = Date.now();
    const newCartId = await carrito.save(body);
    newCartId? res.status(200).json({"success" : "cart added with ID: "+newCartId}): res.status(400).json({"error": "invalid key. Please verify the body content"})
    
})

routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    wasDeleted? res.status(200).json({"success": "cart successfully removed"}): res.status(404).json({"error": "cart not found"})
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

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${PORT}`)
})