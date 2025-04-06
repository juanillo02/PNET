document.addEventListener("DOMContentLoaded", function () {
    // Obtener la URL actual
    const currentPage = window.location.pathname.split("/").pop(); 
    // Seleccionar todos los enlaces del menú
    document.querySelectorAll(".Listamenu").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("activo"); // Agregar la clase si la URL coincide
        }
    });

    const boton = document.getElementById("Modo");

    // Comprobar si hay un modo guardado en localStorage
    if (localStorage.getItem("modo") === "claro") {
        document.body.classList.add("Modoclaro");
        boton.textContent = "🌞"; // Sol en modo claro
    } else {
        document.body.classList.remove("Modoclaro");
        boton.textContent = "🌙"; // Luna en modo oscuro
    }

    boton.addEventListener("click", () => {
        // Cambiar entre el modo claro y oscuro
        document.body.classList.toggle("Modoclaro");

        // Guardar la preferencia en localStorage
        if (document.body.classList.contains("Modoclaro")) {
            localStorage.setItem("modo", "claro");
            boton.textContent = "🌞"; // Sol en modo claro
        } else {
            localStorage.setItem("modo", "oscuro");
            boton.textContent = "🌙"; // Luna en modo oscuro
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let aumentar = document.getElementById("Aumentarfuente");
    let disminuir = document.getElementById("Disminuirfuente");

    function cambiarFuente(factor) {
        let root = document.documentElement; // Se aplica a toda la página
        let tamañoActual = parseFloat(getComputedStyle(root).fontSize) / 16; // Convierte px a em
        let nuevoTamaño = tamañoActual + factor;


        if (nuevoTamaño >= 0.8 && nuevoTamaño <= 1.7) { // Evita tamaños demasiado pequeños
            root.style.fontSize = nuevoTamaño + "em";
        }
    }

    aumentar.addEventListener("click", () => cambiarFuente(0.1)); // Aumenta en 0.1em
    disminuir.addEventListener("click", () => cambiarFuente(-0.1)); // Disminuye en 0.1em
});

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos el enlace con id "Admin"
    const adminLink = document.getElementById("Admin");

    // Añadimos un evento de clic al enlace
    adminLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevenimos la acción predeterminada del enlace

        // Solicitamos la contraseña con un prompt
        const password = prompt("Por favor, ingrese la contraseña:");

        // Verificamos si la contraseña es correcta
        const correctPassword = "admin";  // Cambia esto a la contraseña real

        if (password === correctPassword) {
            // Si la contraseña es correcta, redirigimos al usuario a la página admin.html
            window.location.href = "admin.html";
        } else {
            // Si la contraseña es incorrecta, mostramos un mensaje
            alert("Contraseña incorrecta. Intenta nuevamente.");
        }
    });
});
