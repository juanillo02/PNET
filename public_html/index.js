const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(cors());

const admin = require('./routes/administrador');
app.use('/admin', admin);

const usuario = require('./routes/usuario');
app.use('/reserva', usuario);

const { connectDb } = require('./routes/db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//Arranque del servidor conectando a la BBDD
const server = http.createServer(app);

async function startServer() {
	try {
		await connectDb();
		server.listen(PORT, function () {
			console.log("Server up and running on localhost:" + PORT);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
}

startServer();