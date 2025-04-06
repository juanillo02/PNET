document.addEventListener('DOMContentLoaded', function () {
    let botones = document.getElementsByTagName("button");
    let Cadiz = document.getElementById('Cadiz');
    let ElPuerto = document.getElementById('ElPuerto');
    let Sevilla = document.getElementById('Sevilla');

    for (let boton of botones) {
        boton.addEventListener('click', function () 
        {
            if (boton.textContent === 'Cádiz') 
            {
                Cadiz.style.display = 'block';
                ElPuerto.style.display = 'none';
                Sevilla.style.display = 'none';
            } 
            else if (boton.textContent === 'El Puerto') 
                {
                Cadiz.style.display = 'none';
                ElPuerto.style.display = 'block';
                Sevilla.style.display = 'none';
                
            } 
            else if (boton.textContent === 'Sevilla') 
                {
                Cadiz.style.display = 'none';
                ElPuerto.style.display = 'none';
                Sevilla.style.display = 'block';
            } 
        });
    }

    
});
