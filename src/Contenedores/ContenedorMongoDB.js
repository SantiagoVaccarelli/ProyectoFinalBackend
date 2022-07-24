require("dotenv").config()
const mongoose = require("mongoose")
const productosSchema = require("../schemas/productoSchema")

mongoose.connect(process.env.MONGO_SERVER);

class Contenedor {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection,schema)
    }

    async save(prod) {
        return (await this.collection.create(prod))._id}

    async getAll() { return  this.collection.find({})}

    async getById(id) {
        try{
            const prod = await this.collection.findById(id)
            return prod
        }catch(err){ throw new Error(err) }
    }

    async updatebyId(id, prod) {
        try{
            const newprod = await this.collection.findByIdAndUpdate(id, prod)
            return newprod
        }catch(err){ throw new Error(err)  }
    }

    async deleteById(id) {
        try{
            const deletedDoc = await this.collection.findByIdAndDelete(id)
            return deletedDoc
        }catch(err){ throw new Error(err) }
    }
}

module.exports = Contenedor;