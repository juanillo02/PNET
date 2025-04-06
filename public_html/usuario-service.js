const { getCollection } = require('./db');
const { ObjectId } = require('mongodb');

const Reservas = function () {};

Reservas.prototype.getAll = async () => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.find({}).toArray();
};

Reservas.prototype.add = async (ReservaDato) => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.insertOne(ReservaDato);
};

module.exports = new Reservas();