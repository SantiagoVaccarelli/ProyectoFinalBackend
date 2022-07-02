const Contenedor = require('../Contenedores/ContenedorMongoDB')
const productosSchema =  require("../schemas/productoSchema.js")

class ContenedorProductoMongo extends Contenedor {
    constructor() { super("productos", productosSchema); }
}

module.exports = ContenedorProductoMongo