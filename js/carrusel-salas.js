document.addEventListener('DOMContentLoaded', function () {
    
    let imagenesBoton1 = [
        {
            "url": "Imagenes/salaverano.jpg",
            "sala": "Verano",
            "nombre": "Sala Verano",
            "descripcion": "Disfruta del verano todo el año en un ambiente tropical con luces LED y hamacas. ¡El lugar ideal para cantar y relajarte!"
        },
        {
            "url": "Imagenes/salarock.jpg",
            "sala": "Rock",
            "nombre": "Sala Rock",
            "descripcion": "Para los amantes del rock, con un diseño industrial y potente sonido. ¡Canta con energía como en un concierto!"
        },
        {
            "url": "Imagenes/salarosa.jpg",
            "sala": "Corazon",
            "nombre": "Sala Corazón",
            "descripcion": "Un ambiente elegante y acogedor para una experiencia de karaoke única con luces suaves y tecnología avanzada."
        },
    ];
    

    let imagenesBoton2 = [
        {
            "url": "Imagenes/salaazul.jpg",
            "sala": "Azul",
            "nombre": "Sala Azul",
            "descripcion": "Disfruta de un ambiente relajante y moderno, con luces azules que crean una atmósfera tranquila, perfecta para una noche de karaoke con amigos."
        },
        {
            "url": "Imagenes/salafuturo.jpeg",
            "sala": "Futuro",
            "nombre": "Sala Futuro",
            "descripcion": "Un espacio futurista y tecnológico, ideal para quienes buscan una experiencia de karaoke vanguardista, rodeados de pantallas y luces LED."
        },
        {
            "url": "Imagenes/salabam.jpg",
            "sala": "Bam",
            "nombre": "Sala Bam",
            "descripcion": "Vive la energía de la Sala Bam, con un diseño dinámico y colores vibrantes que te invitan a liberar tu voz y disfrutar del karaoke al máximo."
        },
    ];
    

    let imagenesBoton3 = [
        {
            "url": "Imagenes/salacolores.jpg",
            "sala": "Colores",
            "nombre": "Sala Colores",
            "descripcion": "Sumérgete en un mundo lleno de colores vibrantes que se iluminan a medida que disfrutas del karaoke. Esta sala dinámica y llena de energía es perfecta para aquellos que quieren cantar y divertirse en un ambiente lleno de vida."
        },
        {
            "url": "Imagenes/salaroja.jpg",
            "sala": "Roja",
            "nombre": "Sala Roja",
            "descripcion": "Una sala cálida y acogedora, donde los tonos rojos te envolverán mientras disfrutas de una divertida noche de karaoke con tus amigos."
        },
        {
            "url": "Imagenes/salaoscura.jpeg",
            "sala": "Oscura",
            "nombre": "Sala Oscura",
            "descripcion": "Sumérgete en la penumbra de la Sala Oscura, donde la iluminación tenue y los efectos especiales crean el escenario perfecto para una experiencia de karaoke única."
        },
    ];
    


    let atras = document.getElementById('atras');
    let adelante = document.getElementById('adelante');
    let imagen = document.getElementById('img');
    let puntos = document.getElementById('puntos');
    let texto = document.getElementById('texto');
    let actual = 0;
    let textoMovil = document.getElementById('CarruselSala');
    let botones = document.getElementsByTagName("button");
    let imagenes = imagenesBoton1;

    // Inicializa el carrusel con la primera imagen
    posicionCarrusel();

    // Funcion para seleccionar el lugar del karaoke
    botonesLocalidad();


    for (let boton of botones) {
        boton.addEventListener('click', function () 
        {
            if (boton.textContent === 'Cádiz') 
            {
                imagenes = imagenesBoton1;
                let mensajeError = textoMovil.querySelector(".TextoMovil");
                if (mensajeError) {
                    mensajeError.remove();
                }
            } 
            else if (boton.textContent === 'El Puerto') 
                {
                imagenes = imagenesBoton2;
                let mensajeError = textoMovil.querySelector(".TextoMovil");
                if (mensajeError) {
                    mensajeError.remove();
                }
            } 
            else if (boton.textContent === 'Sevilla') 
                {
                imagenes = imagenesBoton3;
                let mensajeError = textoMovil.querySelector(".TextoMovil");
                if (mensajeError) {
                    mensajeError.remove();
                }
            } 
            actual = 0; // Reinicia el carrusel a la primera imagen
            posicionCarrusel(); // Actualiza los puntos
            actualizarImagen();
        });
    }

    // Cuando pulsamos el botón de "atrás", nos llevará a la imagen anterior
    atras.addEventListener('click', function () {

        //Si ya se muestra un texto (porque se ha pulsado en la foto anterior), lo eliminamos
        let mensajeError = textoMovil.querySelector(".TextoMovil");
        if (mensajeError) {
            mensajeError.remove();
        }

        // Calcula la imagen anterior
        actual -= 1;
        if (actual == -1) {
            actual = imagenes.length - 1;
        }

        // Actualiza la imagen y texto
        actualizarImagen();
    });




    // Cuando pulsamos el botón de "atrás", nos llevará a la imagen siguiente
    adelante.addEventListener('click', function () {

        //Si ya se muestra un texto (porque se ha pulsado en la foto anterior), lo eliminamos
        let mensajeError = textoMovil.querySelector(".TextoMovil");
        if (mensajeError) {
            mensajeError.remove();
        }

        actual += 1;
        if (actual == imagenes.length) {
            actual = 0;
        }

        // Actualiza la imagen y texto
        actualizarImagen();
    });

    // Actualiza los puntos del carrusel
    function posicionCarrusel() {
        puntos.innerHTML = "";
        for (var i = 0; i < imagenes.length; i++) {
            if (i == actual) {
                puntos.innerHTML += '<p class="bold">.<p>';
            } else {
                puntos.innerHTML += '<p>.<p>';
            }
        }
    }

    function actualizarImagen() {
        imagen.innerHTML = `<img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy", ></img>`;
        texto.innerHTML = `
            <a href="#${imagenes[actual].sala}"><h3>${imagenes[actual].nombre}</h3></a>
            <p>${imagenes[actual].descripcion}</p>
        `;
        posicionCarrusel();
    }

    // Mostrar descripcion de la sala en la version movil
    imagen.addEventListener('click', function () {
        // Si no hay descripcion, la creamos 
        let existeTexto = textoMovil.querySelector(".TextoMovil");

        if (!existeTexto) {
            // Crear el mensaje de error si no existe
            let descripcion = document.createElement("p");
            //Le añadimos una clase para modificarlo en el CSS
            descripcion.classList.add("TextoMovil");
            //Lo añadimos al HTML
            textoMovil.appendChild(descripcion);

            // Mostrar nombre y descripción de la imagen
            descripcion.innerHTML = `
                <a href="#${imagenes[actual].sala}"><h3>${imagenes[actual].nombre}</h3></a>
                <p>${imagenes[actual].descripcion}</p> 
                `;
        } else {
            // Si ya existe el texto, lo actualizamos
            existeTexto.innerHTML = `
                <a href="#${imagenes[actual].sala}"><h3>${imagenes[actual].nombre}</h3></a>
                <p>${imagenes[actual].descripcion}</p>
            `;
        }
    });

});


// Esta funcion se encarga de mostrar las salas disponibles segun el boton pulsado (Cadiz, El Puerto, Sevilla)
function botonesLocalidad() {
    // Seleccionamos todos los botones 
    let botones = document.querySelectorAll(".Botoneslocalizacion>button");
    // Como la clase del boton de aceptar es la misma que los botones de localizacion, eliminamos el boton de aceptar
    let botonesSinAceptar = Array.from(botones).filter(boton => boton.id !== 'Aceptar');

    // Por estetica, queremos que al pulsar un boton de localizacion (cadiz, el puerto, sevilla), se mantenga un color diferente a los demas, para que el usuario sepa de que lugar esta seleccionando su sala
    // Esta variable almacena el valor original del boton (antes de ser pulsado)
    let botonAnterior = null;

    // Iteramos sobre los botones de localizacion
    for (let boton of botonesSinAceptar) {
        boton.addEventListener('click', function () {
            // Si hay un botón seleccionado, ponemos su color original
            if (botonAnterior !== null) {
                botonAnterior.style.backgroundColor = '';
                botonAnterior.style.borderColor = '';
            }

            // Cambiamos el color del botón pulsado 
            boton.style.backgroundColor = '#5C1C4D';
            boton.style.borderColor = '#774168';

            // Actualizamos el botón anterior para el siguiente click
            botonAnterior = boton;
        });
    }
}