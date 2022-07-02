const Contenedor = require('../Contenedores/ContenedorFirebase')

class ContenedorProductoFirebase extends Contenedor {
    constructor() { super("productos"); }
}

module.exports = ContenedorProductoFirebase