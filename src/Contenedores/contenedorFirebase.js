var admin = require("firebase-admin");
var serviceAccount = require("../ecommerce-15df5-firebase-adminsdk-8zs4l-c98457b92b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

class Contenedor {

	constructor(){
		this.query = db.collection('productos')
	}

	async getById(id) {
		const document = await this.query.doc(id).get()
		return document.data()
	}

	async deleteById(id) {
		await this.query.doc(id).delete()
	}

	async updateById(id, newData) {	
		newData.id = id
		await this.query.doc(id).set(newData)
	}

	async save(object) {    
		const product = await this.query.add(object)
		object.id = product.id
		this.query.doc(product.id).set(object)
		return product.id
	}

	async getAll() {
		const snapshot = await this.query.get()
    	return snapshot.docs.map(doc => doc.data());
	}
}

module.exports = Contenedor;