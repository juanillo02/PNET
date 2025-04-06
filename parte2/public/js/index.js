window.addEventListener('DOMContentLoaded', (event) => {
    let intervalo;
    let timeout;
    let animacionDetenida = false;

    // Función para cambiar las reseñas
    function cambiarResenas() {
        // Ocultar las resenas 1, 2 y 3
        document.querySelectorAll('.Resena1, .Resena2, .Resena3').forEach(function(resena) {
            resena.classList.remove('visible');
        });

        // Mostrar las resenas 4, 5 y 6
        document.querySelectorAll('.Resena4, .Resena5, .Resena6').forEach(function(resena) {
            resena.classList.add('visible');
        });

        // Esperar 5 segundos y luego cambiar
        timeout = setTimeout(function () {
            // Ocultar las resenas 4, 5 y 6
            document.querySelectorAll('.Resena4, .Resena5, .Resena6').forEach(function(resena) {
                resena.classList.remove('visible');
            });

            // Mostrar las resenas 1, 2 y 3
            document.querySelectorAll('.Resena1, .Resena2, .Resena3').forEach(function(resena) {
                resena.classList.add('visible');
            });
        }, 5000); // 5000 ms = 5 segundos
    }

    // Función para iniciar el ciclo de animación
    function iniciarAnimacion() {
        intervalo = setInterval(cambiarResenas, 10000);
        document.body.classList.remove("animacion-pausada");
    }

    // Función para detener la animación
    function detenerAnimacion() {
        clearInterval(intervalo);  // Detener el intervalo de animación
        clearTimeout(timeout);  // Detener el setTimeout pendiente
        document.body.classList.add("animacion-pausada");
    }

    // Llamar a la función al cargar
    cambiarResenas();
    iniciarAnimacion();

    // Obtener el botón que controlará la animación
    const botonAnimacion = document.getElementById("Parar");
    const iconoParar = document.getElementById("iconoParar");

    botonAnimacion.addEventListener("click", function () {
        if (animacionDetenida) {
            iniciarAnimacion();
            iconoParar.src = "Imagenes/play.png"; // Cambiar a icono de play
            botonAnimacion.setAttribute("aria-label", "Pausar animación");
        } else {
            detenerAnimacion();
            iconoParar.src = "Imagenes/pausa.png"; // Cambiar a icono de pausa
            botonAnimacion.setAttribute("aria-label", "Reanudar animación");
        }
        animacionDetenida = !animacionDetenida; // Alternar estado
    });
});