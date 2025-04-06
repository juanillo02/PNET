const express = require('express');
const router = express.Router();
const ReservasService = require('./usuario-service');
const { REFUSED } = require('dns');

//localhost:8080/usuario
/*Mostras todas las reservas*/
router.get('/', async (req, res) => {
    res.status(200).json({ mensaje: 'Bienvenido a la API de usuario' });
});

/*Añadir una reserva siempre y cuando no esté reservada anteriormente*/
router.post("/", async (req, res) => {
    const Reserva = req.body;
    
    // Comprobación de que la reserva enviada no está vacía
    if (Object.keys(Reserva).length == 0) {
        return res.status(400).send({ msg: 'La reserva está vacía' });
    }

    try {
        // Obtener las reservas existentes (reemplaza con la función correcta de tu servicio)
        const reservasExistentes = await ReservasService.getAll(); // Cambiar a la función correcta

        // Comprobar si ya existe una reserva con el mismo nombre, sala, fecha y hora
        const reservaCoincidente = reservasExistentes.some((reserva) => {
            return (
                reserva.nombre === Reserva.nombre && // Compara el nombre
                reserva.sala === Reserva.sala && // Compara la sala
                reserva.fecha === Reserva.fecha && // Compara la fecha
                reserva.horas.some(hora => Reserva.horas.includes(hora)) // Compara las horas
            );
        });

        if (reservaCoincidente) {
            return res.status(400).send({ msg: 'Ya existe una reserva en ese horario' });
        }

        // Si no hay coincidencias, añadir la nueva reserva
        await ReservasService.add(Reserva);
        return res.status(201).send({ msg: 'Reserva creada correctamente!' });

    } catch (error) {
        console.error("Error al agregar la reserva:", error);
        return res.status(500).send({ msg: error.message });
    }
});



module.exports = router;