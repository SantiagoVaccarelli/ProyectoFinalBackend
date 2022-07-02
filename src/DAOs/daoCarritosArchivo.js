const Contenedor = require('../Contenedores/ContenedorArchivo')

class ContenedorCarritoArchivo extends Contenedor {
    constructor() { super("carrito.json", ["timestamp", "products"]); }
}

module.exports = ContenedorCarritoArchivo