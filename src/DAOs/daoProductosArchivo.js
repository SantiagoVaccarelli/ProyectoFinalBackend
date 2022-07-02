const Contenedor = require('../Contenedores/ContenedorArchivo')

class ContenedorProductoArchivo extends Contenedor {
    constructor() { super("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]); }
}

module.exports = ContenedorProductoArchivo