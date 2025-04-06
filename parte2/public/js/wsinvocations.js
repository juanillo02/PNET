function postReserva(ciudad) {
    let persona = $("input[name='nombre']").val();
    let email = $("input[name='email']").val();
    let telefono = $("input[name='tel']").val();
    let numPersonas = parseInt($("input[name='numPersonas']").val(), 10);
    let sala = $("#Seleccionarsala").val();
    let fecha = $("input[name='fecha']").val();
    // Obtener los horarios seleccionados
    let horarios = [];
    $("input[name='hora']:checked").each(function () {
        horarios.push($(this).val());
    });
    // Enviar la solicitud POST
    $.ajax({
        type: "POST",
        url: "/reserva", // Ruta del backend donde se guardará la reserva
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "nombre": ciudad,
            "sala": sala,
            "persona": persona,
            "email": email,
            "telefono": telefono,
            "personas": numPersonas,
            "fecha": fecha,
            "horas": horarios
        }),
        success: function (data) {
            $("#resPelicula").html(data.msg); // Mostrar mensaje de éxito
        },
        error: function (res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function MostrarReservas() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/admin",
        success: function (data) {
            let htmlContent = "<ul class ='FuncionGet'>";
            // Iteramos sobre el array de reservas
            $.each(data, function (index, reserva) {
                htmlContent += `
                    <li>
                        <strong>ID:</strong> 
                        <span class="reserva-id" data-id="${reserva._id}" style="cursor: pointer;">
                            ${reserva._id}
                        </span>
                        <div class="reserva-detalle" id="detalle-${reserva._id}" style="display: none; padding-left: 20px; margin-top: 5px;">
                            <strong>Ciudad:</strong> ${reserva.nombre} <br>
                            <strong>Sala:</strong> ${reserva.sala} <br>
                            <strong>Persona:</strong> ${reserva.persona} <br>
                            <strong>Email:</strong> ${reserva.email} <br>
                            <strong>Teléfono:</strong> ${reserva.telefono} <br>
                            <strong>Número de Personas:</strong> ${parseInt(reserva.personas, 10) || 0} <br>
                            <strong>Fecha:</strong> ${reserva.fecha} <br>
                            <strong>Horario:</strong> ${reserva.horas} <br>
                        </div>
                    </li>
                `;
            });
            htmlContent += "</ul>";
            // Mostramos la lista en el div
            $("#resReservas").html(htmlContent);
            // Añadir evento de clic para desplegar los detalles
            $(".reserva-id").click(function () {
                let reservaId = $(this).data("id");
                $("#detalle-" + reservaId).slideToggle();
            });
            // Mostrar la ventana de reservas
            $("#VentanaMostrarReservas").css("display", "flex");
        },
        error: function (res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function MostrarReserva(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `/admin/${id}`, // Endpoint que busca por ID
        success: function (reserva) {
            if (!reserva) {
                alert("No se encontró la reserva con ese ID.");
                return;
            }

            let htmlContent = `
                <p><strong>ID:</strong> ${reserva._id}</p>
                <p><strong>Ciudad:</strong> ${reserva.nombre}</p>
                <p><strong>Sala:</strong> ${reserva.sala}</p>
                <p><strong>Persona:</strong> ${reserva.persona}</p>
                <p><strong>Email:</strong> ${reserva.email}</p>
                <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
                <p><strong>Número de Personas:</strong> ${parseInt(reserva.personas, 10) || 0}</p>
                <p><strong>Fecha:</strong> ${reserva.fecha}</p>
                <p><strong>Horario:</strong> ${reserva.horas}</p>
            `;

            $("#resBusqueda").html(htmlContent);
            $("#VentanaResultadoReserva").css("display", "flex"); // Mostrar la ventana con los datos
        },
        error: function () {
            alert("Error al obtener la reserva. Verifica el ID.");
        }
    });
}

function ActualizarReserva(id) {
    // Obtener la reserva por el ID (GET)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `/admin/${id}`, // Endpoint que busca por ID
        success: function (reserva) {
            if (!reserva) {
                alert("No se encontró la reserva con ese ID.");
                return;
            }

            // Crear el formulario con botones para la ciudad y un select para la sala
            let htmlContent = `
                <h2><strong>ID:</strong> ${reserva._id}</h2>
                
                <h3 class="Cambio">Seleccione un lugar</h3>
                <div class="Botoneslocalizacion">
                    <button class="btn-ciudad" data-ciudad="Cádiz">Cádiz</button>
                    <button class="btn-ciudad" data-ciudad="El Puerto">El Puerto</button>
                    <button class="btn-ciudad" data-ciudad="Sevilla">Sevilla</button>
                </div>
                <p><strong>Ciudad Seleccionada:</strong> <span id="ciudadSeleccionada">${reserva.nombre}</span></p>

                <div class="Seleccionarsala">
                <h3 class="Cambio">Seleccione una sala</h3>
                <div class="Error" id = "sala">
                    <select id="Seleccionarsala" aria-label="Sala">
                        <option class="Cadiz" value="Sala Verano">Sala Verano</option>
                        <option class="Cadiz" value="Sala Rock">Sala Rock</option>
                        <option class="Cadiz" value="Sala Rosa">Sala Rosa</option>
                        <option class="ElPuerto" value="Sala Azul">Sala Azul</option>
                        <option class="ElPuerto" value="Sala Futuro">Sala Futuro</option>
                        <option class="ElPuerto" value="Sala Bam">Sala Bam</option>
                        <option class="Sevilla" value="Sala Colores">Sala Colores</option>
                        <option class="Sevilla" value="Sala Roja">Sala Roja</option>
                        <option class="Sevilla" value="Sala Oscura">Sala Oscura</option>
                    </select>
                </div>
            </div>

                <div class="Datospersonales">
                <h3 class="Cambio">Introduzca sus datos</h3>
                <div class="Error">
                    <input required type="text" name="nombre" value="${reserva.persona}" aria-label="Nombre y apellidos">
                </div>
                <div class="Error">
                    <input required type="email" name="email" value="${reserva.email}" aria-label="Email">
                </div>
                <div class="Error">
                    <input required type="tel" name="telefono" value="${reserva.telefono}" aria-label="Teléfono">
                </div>
                <div class="Error">
                    <input required type="number" name="personas" value="${parseInt(reserva.personas, 10) || 0}" aria-label="Número de Personas">
                </div>
            </div>


             <div class="Seleccionarfecha">
                <h3 class="Cambio">Seleccione una fecha</h3>
                <input required type="date" name="fecha" value="${reserva.fecha}" aria-label="Fecha">
            </div>

            <div class="Seleccionarhorario">
                <h3 class="Cambio">Seleccione un horario</h3>
                <div class="Horarioscheck">
                    <input type="checkbox" id="hora_1" name="hora" value="18:00-19:00">
                    <label for="hora_1">18:00-19:00</label><br>
                    <input type="checkbox" id="hora_2" name="hora" value="19:15-20:15">
                    <label for="hora_2">19:15-20:15</label><br>
                    <input type="checkbox" id="hora_3" name="hora" value="20:30-21:30">
                    <label for="hora_3">20:30-21:30</label><br>
                    <input type="checkbox" id="hora_4" name="hora" value="21:45-22:45">
                    <label for="hora_4">21:45-22:45</label><br>
                    <input type="checkbox" id="hora_5" name="hora" value="23:00-00:00">
                    <label for="hora_5">23:00-00:00</label><br>
                    <input type="checkbox" id="hora_6" name="hora" value="00:15-01:15">
                    <label for="hora_6">00:15-01:15</label><br>
                    <input type="checkbox" id="hora_7" name="hora" value="01:30-02:30">
                    <label for="hora_7">01:30-02:30</label><br>
                    <input type="checkbox" id="hora_8" name="hora" value="02:45-03:45">
                    <label for="hora_8">02:45-03:45</label><br>
                </div>
            </div>

            </div>

            <div class="Botoneslocalizacion">
                <button type="submit" id="Aceptar">Aceptar</button>
            </div>
            `;

            $("#resActualizar").html(htmlContent);
            $("#VentanaResultadoActualizar").css("display", "flex");

            // Seleccionar la ciudad previamente guardada
            $(".btn-ciudad").each(function () {
                if ($(this).data("ciudad") === reserva.nombre) {
                    $(this).addClass("selected");
                }
            });

            // Función para mostrar/desaparecer salas
            filtrarSalas(reserva.nombre, reserva.sala);


            // Evento de selección de ciudad
            $(".btn-ciudad").click(function () {
                $(".btn-ciudad").removeClass("selected");
                $(this).addClass("selected");
                let ciudadSeleccionada = $(this).data("ciudad");
                $("#ciudadSeleccionada").text(ciudadSeleccionada);
                filtrarSalas(ciudadSeleccionada);
            });

            // Marcar los horarios seleccionados
            let horasSeleccionadas = Array.isArray(reserva.horas) ? reserva.horas : reserva.horas.split(",");
            horasSeleccionadas.forEach(hora => {
                $(`input[name='hora'][value='${hora}']`).prop("checked", true);
            });

            // Guardar cambios
            $("#Aceptar").click(function () {
                let ciudadSeleccionada = $(".btn-ciudad.selected").data("ciudad") || reserva.nombre;
                let salaSeleccionada = $("#Seleccionarsala").val();
                let horariosSeleccionados = [];
                $("input[name='hora']:checked").each(function () {
                    horariosSeleccionados.push($(this).val());
                });
            
                let fechaSeleccionada = $("input[name='fecha']").val(); // Esto te dará la fecha en formato DD-MM-YYYY
            
                let datosActualizados = {
                    nombre: ciudadSeleccionada,
                    sala: salaSeleccionada,
                    persona: $("input[name='nombre']").val(),
                    email: $("input[name='email']").val(),
                    telefono: $("input[name='telefono']").val(),
                    personas: $("input[name='personas']").val(),
                    fecha: fechaSeleccionada, // Enviamos la fecha en formato DD-MM-YYYY
                    horas: horariosSeleccionados.join(",")
                };
            
                $.ajax({
                    type: "PUT",
                    url: `/admin/${id}`,
                    contentType: "application/json",
                    data: JSON.stringify(datosActualizados),
                    success: function () {
                        alert("Reserva actualizada correctamente.");
                    },
                    error: function (xhr) {
                        alert(`Error al actualizar la reserva: La fecha, hora y sala ya están ocupadas`);
                    }
                });
            });
            
            
            
        },
        error: function () {
            alert("Error al obtener la reserva. Verifica el ID.");
        }
    });
}


// Mostramos las salas de la ciudad seleccionada
function filtrarSalas(ciudad, salaSeleccionada = null) {
    let ciudadSinTilde = ciudad.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina la tilde de Cádiz
    $("#Seleccionarsala option").hide();
    $("#Seleccionarsala option." + ciudadSinTilde.replace(" ", "")).show();

    // Si hay una sala previamente guardada, seleccionarla
    if (salaSeleccionada) {
        $("#Seleccionarsala").val(salaSeleccionada);
    } else {
        $("#Seleccionarsala").val($("#Seleccionarsala option:visible:first").val());
    }
}



function EliminarReservas() {
    // Confirmar la eliminación de todas las reservas
    let confirmar = confirm("¿Estás seguro de que deseas eliminar todas las reservas?");
    if (confirmar) {
        // Realizar la solicitud DELETE para eliminar todas las reservas
        $.ajax({
            type: "DELETE",
            url: `/admin`, // Endpoint para eliminar todas las reservas
            success: function (response) {
                // Mostrar mensaje de éxito
                $("#resEliminarTodas").html("Todas las reservas han sido eliminadas con éxito!");
                $("#VentanaEliminarTodasReservas").css("display", "flex"); // Mostrar la ventana con el mensaje
            },
            error: function () {
                alert("Error al eliminar todas las reservas.");
            }
        });
    }
}

function EliminarReservaId(id) {
    // Primero obtenemos la reserva por el ID (GET)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `/admin/${id}`,  // Endpoint que busca por ID
        success: function (reserva) {
            if (!reserva) {
                alert("No se encontró la reserva con ese ID.");
                return;
            }

            // Crear el contenido HTML para mostrar los detalles de la reserva
            let htmlContent = `
                <p><strong>ID:</strong> ${reserva._id}</p>
                <p><strong>Ciudad:</strong> ${reserva.nombre}</p>
                <p><strong>Sala:</strong> ${reserva.sala}</p>
                <p><strong>Persona:</strong> ${reserva.persona}</p>
                <p><strong>Email:</strong> ${reserva.email}</p>
                <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
                <p><strong>Número de Personas:</strong> ${parseInt(reserva.personas, 10) || 0}</p>
                <p><strong>Fecha:</strong> ${reserva.fecha}</p>
                <p><strong>Horario:</strong> ${reserva.horas}</p>
                <button type="button" id="Aceptar" onclick="confirmarEliminacion('${id}')">Eliminar Reserva</button>
            `;
            // Mostrar el formulario con los datos de la reserva en la ventana
            $("#resEliminarId").html(htmlContent);
            $("#VentanaResultadoEliminarId").css("display", "flex"); // Mostrar la ventana con los datos
        },
        error: function () {
            alert("Error al obtener la reserva. Verifica el ID.");
        }
    });
}

function confirmarEliminacion(id) {
    // Confirmar la eliminación
    let confirmar = confirm("¿Estás seguro de que deseas eliminar esta reserva?");
    if (confirmar) {
        // Realizar la solicitud DELETE
        $.ajax({
            type: "DELETE",
            url: `/admin/${id}`, // Endpoint para eliminar la reserva
            success: function (response) {
                $("#resEliminarId").html("Reserva eliminada con éxito!");
                $("#VentanaResultadoEliminarId").css("display", "flex"); // Mostrar la ventana de éxito
            },
            error: function () {
                alert("Error al eliminar la reserva.");
            }
        });
    }
}