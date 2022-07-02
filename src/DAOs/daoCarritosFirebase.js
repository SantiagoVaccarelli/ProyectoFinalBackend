const Contenedor = require('../Contenedores/ContenedorFirebase')

class ContenedorCarritosFirebase extends Contenedor {
    constructor() { super("carritos"); }
}

module.exports = ContenedorCarritosFirebase