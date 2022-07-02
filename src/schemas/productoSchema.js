const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    title: {
        type: String
    },
    descripcion: {
        type: String,
    },
    code: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    }
});

module.exports = productosSchema