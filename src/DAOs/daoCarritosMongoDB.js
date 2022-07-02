const Contenedor = require('../Contenedores/ContenedorMongoDB')
const carritosSchema =  require("../schemas/carritoSchema.js")

class ContenedorProductoMongo extends Contenedor {
    constructor() { super("carritos", carritosSchema); }
}

module.exports = ContenedorProductoMongo