const express = require('express');
const router = express.Router();
const ReservasService = require('./administrador-service');
const { REFUSED } = require('dns');

//localhost:8080/reservas
/*Mostras todas las reservas*/
router.get('/', async (req, res) => {
    try {
        const Reservas = await ReservasService.getAll();
        if (Reservas.length == 0) {
            res.status(404).send({ msg: 'No se encontraron reservas' });
        }
        else{
            res.status(200).send(Reservas);
        }
    } catch (error) {
        console.error("Error al buscar reservas:", error);
        res.status(500).send({ msg: error.message });
    }
});
/*Borrar todas las reservas*/
router.delete('/', async (req, res) => {
    try {
        await ReservasService.removeAll();
        res.status(200).send({ msg: 'Reservas eliminadas!' });
    } catch (error) {
        console.error("Error al eliminar Reservas:", error);
        res.status(500).send({ msg: error.message });
    }
});
/*Mostrar las reservas según id*/
router.get("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const Reserva = await ReservasService.get(_id);
        if (!Reserva) {
            res.status(404).send({ msg: 'Reserva no encontrada' });
        }
        else{
            res.status(200).send(Reserva);
        }
    } catch (error) {
        console.error("Error al buscar la reserva:", error);
        res.status(500).send({ msg: error.message });
    }
});

// ---------------------------------------------------------------------------------------------
// Función para comprobar si hay conflicto de hora, fecha y sala
async function comprobarHora(fecha, sala, horas, idAExcluir = null) {
    const reservasExistentes = await ReservasService.getByFechaYSala(fecha, sala);

    for (let reserva of reservasExistentes) {
        // Ignorar la reserva actual (la que se está editando)
        if (idAExcluir && reserva._id.toString() === idAExcluir) continue;

        for (let horaNueva of horas) {
            for (let horaExistente of reserva.horas) {
                if (horasSeSolapan([horaNueva, horaExistente])) {
                    return true;  // Si hay conflicto, retornar true
                }
            }
        }
    }

    return false;  // No hay conflictos
}


// Función para comprobar si dos horas se solapan
function horasSeSolapan(horas) {
    const convertHora = (hora) => {
        const [inicio, fin] = hora.split("-");
        const [hInicio, mInicio] = inicio.split(":").map(Number);
        const [hFin, mFin] = fin.split(":").map(Number);
        const fechaInicio = new Date(0, 0, 0, hInicio, mInicio);
        const fechaFin = new Date(0, 0, 0, hFin, mFin);
        return { fechaInicio, fechaFin };
    };

    const { fechaInicio: inicio1, fechaFin: fin1 } = convertHora(horas[0]);
    const { fechaInicio: inicio2, fechaFin: fin2 } = convertHora(horas[1]);

    return (inicio1 < fin2 && fin1 > inicio2);
}



/*Actualizar una reserva siempre y cuando exista */
// Ruta PUT para actualizar una reserva
router.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    let ReservaData = req.body;

    const { fecha, sala, horas } = ReservaData;

    try {
        const conflicto = await comprobarHora(fecha, sala, horas, _id);

        if (conflicto) {
            return res.status(400).send({ msg: "Estas horas ya están ocupadas en otra reserva." });
        }

        //Evita que el _id esté en los datos a actualizar
        if (ReservaData._id) {
            delete ReservaData._id;
        }

        const result = await ReservasService.update(_id, ReservaData);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ msg: "Reserva no encontrada o sin cambios." });
        } else {
            return res.status(200).send({ msg: 'Reserva actualizada correctamente!' });
        }

    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).send({ msg: error.message });
    }
});





// ---------------------------------------------------------------------------------------------

router.delete("/:_id", async (req, res) => {
    const { _id } = req.params; // Solo cogeremos el ID de la reserva

    try {
        // Obtenemos la reserva utilizando el ID
        const reserva = await ReservasService.get(_id);

        if (!reserva) {
            return res.status(404).send({ msg: "Reserva no encontrada" });
        }

        // Eliminamos la reserva completa
        await ReservasService.remove(_id);

        return res.status(200).send({ msg: "Reserva eliminada correctamente." });

    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).send({ msg: error.message });
    }
});



module.exports = router;