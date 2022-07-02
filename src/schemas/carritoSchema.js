const mongoose = require("mongoose")

const carritosSchema = new mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productos"
            },
            cantidad: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
});

module.exports = carritosSchema