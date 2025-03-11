window.addEventListener('DOMContentLoaded', (event) => {
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
        setTimeout(function () {
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

    // Llamar a la función al cargar
    cambiarResenas();

    // Usar setInterval para repetir la función cada 10 segundos
    setInterval(cambiarResenas, 10000); // 10000 ms = 10 segundos (5 segundos por cada grupo)
});