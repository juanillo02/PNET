document.addEventListener("DOMContentLoaded", function () {
    let formContacto = document.forms["Formulario"];

    // Funcion para seleccionar el lugar del karaoke
    botonesLocalidad();

    formContacto.addEventListener("submit", function (event) {
        let nombre = document.forms["Formulario"].nombre;
        let email = document.forms["Formulario"].email;
        let tel = document.forms["Formulario"].tel;
        let numPersonas = document.forms["Formulario"].numPersonas;
        let horario = document.querySelectorAll(".Horarioscheck input");


        // En estos condicionales comprobamos (llamando a funciones) que los datos introducidos son correctos. Si no lo son, se muestra un error. 
        if (!nombreCorrecto(nombre)) {
            let existeError = nombre.parentNode.querySelector("p");
            if (!existeError) {
                mostrarError(nombre, "Introduzca sus dos apellidos");
            }
        } 
        // Si eran erroneos pero se han corregido, eliminamos el mensaje de error
        else {
            let existeError = nombre.parentNode.querySelector("p");
            if (existeError) {
                existeError.remove();
                nombre.style.border = "";
            }
        }

        if (!emailCorrecto(email)) {
            let existeError = email.parentNode.querySelector("p");
            if (!existeError) {
                mostrarError(email, "Email incorrecto");
            }
        } else {
            let existeError = email.parentNode.querySelector("p");
            if (existeError) {
                existeError.remove();
                email.style.border = "";
            }
        }

        if (!telefonoCorrecto(tel)) {
            let existeError = tel.parentNode.querySelector("p");
            if (!existeError) {
                mostrarError(tel, "El teléfono debe tener 9 dígitos");
            }
        } else {
            let existeError = tel.parentNode.querySelector("p");
            if (existeError) {
                existeError.remove();
                tel.style.border = "";
            }
        }

        if (!numeroPersonasCorrecto(numPersonas)) {
            let existeError = numPersonas.parentNode.querySelector("p");
            if (!existeError) {
                mostrarError(numPersonas, "Superior a la capacidad de la sala");
            }
        } else {
            let existeError = numPersonas.parentNode.querySelector("p");
            if (existeError) {
                existeError.remove();
                numPersonas.style.border = "";
            }
        }

        if (!horarioCorrecto(horario)) {
            let horarioError = document.querySelector(".Seleccionarhorario");
            let existeError = horarioError.querySelector("p");

            if (!existeError) {
                let error = document.createElement("p");
                horarioError.appendChild(error);
                error.textContent = "Horario incorrecto";
                error.style.color = "white";
                error.style.fontSize = "1em";
                error.style.textAlign = "center";
                error.style.border = "2px solid rgb(96, 11, 11)";
                error.style.padding = "0.3em";
                error.style.backgroundColor = "rgba(208, 70, 70, 0.6)";
                error.style.width = "16em";
            }
        } else {
            let horarioError = document.querySelector(".Seleccionarhorario");
            let existeError = horarioError.querySelector("p");
            if (existeError) {
                existeError.remove();
            }
        }

        // Si alguna de las validaciones falla, mostramos una alerta de error
        if (!nombreCorrecto(nombre) || !emailCorrecto(email) || !telefonoCorrecto(tel) || !numeroPersonasCorrecto(numPersonas) || !horarioCorrecto(horario)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo ha fallado...",
            });
        } 
        // Si todo es correcto, mostramos la alerta de éxito
        else {
            Swal.fire({
                title: "Estás seguro?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Sala reservada!",
                        text: "Tu sala de karaoke te espera",
                        icon: "success"
                    });
                }
            });
        }

        event.preventDefault(); // Detener el envío del formulario
    });


    // Con este evento conseguiremos que un mensaje de error se muestre cuando pulsemos un lunes en el calendario (segun nuestro horario, ese dia no se trabaja :D ).
    // Ademas, según nuestra politica, no se pueden elegir fechas posteriores a una semana desde el dia actual. Por lo tanto, con este evento bloqueamos todos los dias anteriores al actual y posteriores a una semana
    document.getElementById('calendario').addEventListener('click', function (event) {
        let fechaReserva = event.target;
        let fechaActual = new Date();

        // No se puede elegir fechas anteriores a la actual
        let fechaMinima = fechaActual.toISOString().split('T')[0];
        fechaReserva.setAttribute('min', fechaMinima);

        // No se puede elegir fechas posteriores a una semana
        let fechaMaxima = new Date(fechaActual);
        // Agregar 7 días a la fecha actual
        fechaMaxima.setDate(fechaActual.getDate() + 7); 
        let fechaMaximaCalendario = fechaMaxima.toISOString().split('T')[0];
        fechaReserva.setAttribute('max', fechaMaximaCalendario);

        // No se pueden elegir los lunes
        fechaReserva.addEventListener('input', function () {
            let fechaSeleccionada = new Date(fechaReserva.value);
            let diaSemana = fechaSeleccionada.getUTCDay(); // 0: Domingo, 1: Lunes, etc.

            // Si es lunes
            if (diaSemana === 1) { 
                // Mostramos un mensaje de error
                fechaReserva.setCustomValidity('Los lunes están bloqueados');
                // Muestra el mensaje
                fechaReserva.reportValidity(); 
            } else {
                // Eliminamos el mensaje de error si no es lunes
                fechaReserva.setCustomValidity(''); 
            }
        });
    });

    // Con este evento comprobamos que la hora actual del sistema no es superior a la que el usuario quiere reservar
    for (let opcion of document.querySelectorAll(".Horarioscheck input")) {
        opcion.addEventListener('input', function (event) {
            // Guardamos la hora y minutos actuales
            let fechaActual = new Date();
            let horaActual = fechaActual.getHours();
            let minActual = fechaActual.getMinutes();
            let inputActual = event.target;
            
            // Simbolos para separar el value del input (Ej: value ="11:00-19:00")
            let simboloGuion = "-";
            let simbolo2puntos = ":";
    
            // Separamos las horas (Ej: 18:00-19:00, ahora tendremos que separarHoras[0] = 18:00 y separarHoras[1] = 19:00)
            var separarHoras = opcion.value.split(simboloGuion);
            // Separamos la hora de los minutos (en la primera hora almacenada)
            var horaInicio = separarHoras[0].split(simbolo2puntos);
            
            // Comparamos si la hora de inicio es anterior a la hora actual
            if (parseInt(horaInicio[0]) < horaActual || (parseInt(horaInicio[0]) === horaActual && parseInt(horaInicio[1]) <= minActual)) {
                inputActual.setCustomValidity('La hora seleccionada es anterior a la actual');
                inputActual.reportValidity(); 
            } else {
                inputActual.setCustomValidity('');  // Eliminamos el mensaje de error si es válida
            }
        });

    }

});

// Esta funcion comprueba que el nombre es correcto
function nombreCorrecto(nombre) {
    let expresionNombre = /[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+/;
    if (nombre.value.match(expresionNombre))
        return true;
    else
        return false;
}

// Esta funcion comprueba que el email es correcto
function emailCorrecto(email) {
    let expresionEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (email.value.match(expresionEmail))
        return true;
    else
        return false;
}

// Esta funcion comprueba que el telefono es correcto
function telefonoCorrecto(tel) {
    //Comprobamos que el telefono tiene 9 cifras
    if (tel.value.length == 9)
        return true;
    else
        return false;
}

// Esta funcion va a comparar que el numero de personas que ha escrito el usuario no exceda la capacidad de la sala (ademas, comprueba que si no ha seleccionado sala, se muestre un mensaje de error).
// El mensaje de error en esta funcion solo se muestra en seleccionar sala, el return sera el que marque el mensaje de error en el numero de personas (esto se comprueba en el formContacto.addEventListener)
function numeroPersonasCorrecto(numPersonas) {
    let opcion = document.getElementById("Seleccionarsala").selectedIndex;
    let sala = document.getElementById("sala");

    // Si la opcion es -1 es porque no ha seleccionado ninguna sala
    if (opcion == -1) {
        // Verificamos si ya existe un mensaje de error en el campo de la sala
        let existeError = sala.parentNode.querySelector("p");

        if (!existeError) {
            // Mostramos un error
            mostrarError(sala, "Por favor seleccione una sala");
            document.getElementById("Seleccionarsala").style.border = "3.5px solid rgb(96, 11, 11)";
        }
        return false;

    } else {
        // Si ha seleccionado una sala, eliminamos el mensaje de error
        let existeError = sala.parentNode.querySelector("p");
        if (existeError) {
            existeError.remove();
            // Restauramos el borde
            document.getElementById("Seleccionarsala").style.border = "";  
        }

        // Validamos que el número de personas no exceda la capacidad de la sala seleccionada
        if (numPersonas.value > salaSeleccionada(opcion)) {
            mostrarError(numPersonas, "La sala permite menos de " + salaSeleccionada(opcion) + " personas");
            return false;
        } else {
            // Si el número de personas es válido, eliminamos el mensaje de error
            let errorNumPersonas = numPersonas.parentNode.querySelector("p");
            if (errorNumPersonas) {
                errorNumPersonas.remove();
                numPersonas.style.border = "";  // Restauramos el borde
            }
            return true;
        }
    }
}



// Esta funcion devolvera el numero de personas permitidas por sala, dependiendo de su indice en el select
function salaSeleccionada(opcion) {
    let PersonasporSala = [4, 6, 25, 20, 25, 10, 15, 15, 20];

    switch (opcion) {
        case -1: //No ha seleccionado ninguna
            return 0;
        case 0: //Sala verano
            return PersonasporSala[0];
        case 1: //Sala rock
            return PersonasporSala[1];
        case 2: //Sala rosa
            return PersonasporSala[2];
        case 3: //Sala azul
            return PersonasporSala[3];
        case 4: //Sala futuro
            return PersonasporSala[4];
        case 5: //Sala bam
            return PersonasporSala[5];
        case 6: //Sala colores
            return PersonasporSala[6];
        case 7: //Sala roja
            return PersonasporSala[7];
        case 8: //Sala oscura
            return PersonasporSala[8];
    }
}

// Esta funcion va a comprobar que el horario es consecutivo, es decir, que se han seleccionado checkbox uno tras otro
function horarioCorrecto(horario) {
    let cont = 0;

    //Comprobamos cuantos checkbox ha marcado el usuario
    for (let i = 0; i < horario.length; i++) {
        if (horario[i].checked)
            cont++;
    }

    // Si no ha marcado ningun checkbox entonces dara error
    if (cont == 0)
        return false;

    // Si hay más de un checkbox marcado, debemos comprobar que estén consecutivos
    else if (cont > 1) {
        let flag = false;
        let i = 0;

        // Buscamos el primer checkbox marcado
        while (i < horario.length && !horario[i].checked) {
            i++;
        }

        // Como hemos contado el checkbox marcado, restamos 1
        cont--;

        // Aumentamos 1 para el siguiente checkbox
        i++;
        // Comprobamos que estan consecutivos
        let consecutive = true;
        while (i < horario.length && consecutive && cont > 0) {
            // Si encontramos un checkbox marcado, verificamos que el siguiente también lo esté
            if (horario[i].checked) {
                i++;
                // Restamos 1 al contador ya que hemos contado otro checkbox
                cont--;
            } else {
                // Si encontramos uno no marcado, entonces no estan consecutivos
                consecutive = false;
            }
        }
        // Dependiendo del bucle anterior devolveremos un flag
        if (consecutive)
            flag = true;

        return flag;
    }
    // Si hay solo 1 checkbox marcado, devolvemos true
    else
        return true;

}

// Esta funcion se encarga de mostrar las salas disponibles segun el boton pulsado (Cadiz, El Puerto, Sevilla)
function botonesLocalidad() {
    // Seleccionamos las opciones de cada lugar
    let Cadiz = document.querySelectorAll(".Cadiz");
    let ElPuerto = document.querySelectorAll(".ElPuerto");
    let Sevilla = document.querySelectorAll(".Sevilla");

    // Seleccionamos todos los botones 
    let botones = document.querySelectorAll(".Botoneslocalizacion>button");
    // Como la clase del boton de aceptar es la misma que los botones de localizacion, eliminamos el boton de aceptar
    let botonesSinAceptar = Array.from(botones).filter(boton => boton.id !== 'Aceptar');

    // Para que el cuadro de seleccion salga vacio, tendremos que poner su indice a -1
    let seleccionSala = document.getElementById("Seleccionarsala");
    seleccionSala.selectedIndex = -1;

    // Por estetica, queremos que al pulsar un boton de localizacion (cadiz, el puerto, sevilla), se mantenga un color diferente a los demas, para que el usuario sepa de que lugar esta seleccionando su sala
    // Esta variable almacena el valor original del boton (antes de ser pulsado)
    let botonAnterior = null;

    // Iteramos sobre los botones de localizacion
    for (let boton of botonesSinAceptar) {
        boton.addEventListener('click', function () {
            // Cada vez que pulsemos un boton de localizacion, tendremos que poner su indice a -1 para que desaparezca la sala "seleccionada"
            seleccionSala.selectedIndex = -1;

            // Si hay un botón seleccionado, ponemos su color original
            if (botonAnterior !== null) {
                botonAnterior.style.backgroundColor = '';
                botonAnterior.style.borderColor = '';
            }

            // Cambiamos el color del botón pulsado 
            boton.style.backgroundColor = '#5C1C4D';
            boton.style.borderColor = '#774168';

            // Ocultamos todas las salas
            for (let sala of Cadiz) {
                sala.style.display = 'none';
            }
            for (let sala of ElPuerto) {
                sala.style.display = 'none';
            }
            for (let sala of Sevilla) {
                sala.style.display = 'none';
            }

            // Mostramos las salas de la ciudad seleccionada
            if (boton.textContent === 'Cádiz') {
                for (let sala of Cadiz) {
                    sala.style.display = 'block';
                }

            } else if (boton.textContent === 'El Puerto') {
                for (let sala of ElPuerto) {
                    sala.style.display = 'block';
                }

            } else if (boton.textContent === 'Sevilla') {
                for (let sala of Sevilla) {
                    sala.style.display = 'block';
                }
            }

            // Actualizamos el botón anterior para el siguiente click
            botonAnterior = boton;
        });
    }
}

// Esta funcion se encargar de mostrar un mensaje de error debajo del input que ha fallado
function mostrarError(dato, cadena) {
    // Eliminamos cualquier mensaje de error previo para que no se repita si le damos a aceptar
    let existeError = dato.parentNode.querySelector("p");
    if (existeError) {
        existeError.remove(); 
    }

    // Ahora agregamos el nuevo mensaje de error
    let error = document.createElement("p");
    dato.parentNode.appendChild(error);
    error.textContent = cadena;
    error.style.color = "white";
    error.style.fontSize = "1em";
    error.style.textAlign = "center";
    error.style.border = "2px solid rgb(96, 11, 11)";
    error.style.padding = "0.3em";
    error.style.backgroundColor = "rgba(208, 70, 70, 0.6)";  

    // Cambiar el borde del input a rojo, excepto si es la sala (ya que esta tiene otra estructura)
    if (cadena !== "Por favor seleccione una sala") {
        dato.style.border = "3.5px solid rgb(96, 11, 11)";  // Borde rojo
    }
}

