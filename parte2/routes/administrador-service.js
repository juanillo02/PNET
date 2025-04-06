const { getCollection } = require('./db');
const { ObjectId } = require('mongodb');

const Reservas = function () {};

Reservas.prototype.getAll = async () => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.find({}).toArray();
};

Reservas.prototype.removeAll = async () => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.deleteMany({});
};

Reservas.prototype.get = async (_id) => {
	const ReservasCollection = await getCollection("reservas");
	console.log(typeof _id, _id);
	return await ReservasCollection.findOne({ _id: ObjectId.createFromHexString(_id) });
};

Reservas.prototype.update = async (_id, ActualizarReserva) => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.updateOne({ _id: ObjectId.createFromHexString(_id) }, { $set: ActualizarReserva } );
};

Reservas.prototype.remove = async (_id) => {
	const ReservasCollection = await getCollection("reservas");
	return await ReservasCollection.deleteOne({ _id: ObjectId.createFromHexString(_id) });
};


Reservas.prototype.getByFechaYSala = async (fecha, sala) => {
    const ReservasCollection = await getCollection("reservas");
    
    // Buscar reservas con la misma fecha y sala
    return await ReservasCollection.find({ fecha: fecha, sala: sala }).toArray();
};


module.exports = new Reservas();