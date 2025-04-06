document.addEventListener("DOMContentLoaded", function () {
    // Asegurarse de que todas las ventanas estén cerradas al principio
    const ventanas = document.querySelectorAll('.Ventana');
    ventanas.forEach(ventana => {
        ventana.style.display = 'none'; // Todas las ventanas empiezan ocultas
    });

    // Seleccionamos todos los botones que abrirán una ventana emergente
    const botonesAbrir = document.querySelectorAll('.abrirFormulario');

    // Añadimos el evento a cada botón para abrir la ventana correspondiente
    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtenemos el id del formulario correspondiente usando el atributo data-form
            const ventanaId = boton.getAttribute('data-form');
            const ventana = document.getElementById(ventanaId); // Usamos directamente el id

            // Mostramos la ventana emergente
            ventana.style.display = 'flex';
        });
    });

    // Función para cerrar la ventana emergente
    const botonesCerrar = document.querySelectorAll('.cerrar');
    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', () => {
            const ventanaId = boton.getAttribute('data-target');
            const ventana = document.getElementById(ventanaId);

            // Ocultamos la ventana emergente
            ventana.style.display = 'none';
        });
    });

    // Opcional: Cerrar la ventana si el usuario hace clic fuera de la ventana emergente
    window.addEventListener('click', (event) => {
        const ventanas = document.querySelectorAll('.Ventana');
        ventanas.forEach(ventana => {
            if (event.target === ventana) {
                ventana.style.display = 'none';
            }
        });
    });


    document.getElementById("MostrarReservas").addEventListener("click", function () {
        MostrarReservas();
    });

    document.getElementById("BuscarReserva").addEventListener("click", function () {
        let id = document.querySelector("#VentanaBuscarReserva input[name='ID']").value;
        MostrarReserva(id);
    });

    document.getElementById("ActualizarReserva").addEventListener("click", function () {
        let id = document.querySelector("#VentanaActualizarReserva input[name='ID']").value;
        ActualizarReserva(id);
    });

    document.getElementById("EliminarTodasReservas").addEventListener("click", function () {
        EliminarReservas();
    });

    document.getElementById("EliminarReservaId").addEventListener("click", function () {
        let id = document.querySelector("#VentanaEliminarReserva input[name='ID']").value;
        EliminarReservaId(id);
    });
});
