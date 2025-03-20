function Mas() {
    const Mostrar = document.getElementById('Texto');
    const Boton = document.getElementById('LeerMas');
    
    if (Boton.innerHTML === 'Leer más') {
        Mostrar.innerHTML += '<br>Con distinas salas equipadas con sistemas de sonido de alta calidad, pantallas HD y una amplia selección de canciones en múltiples idiomas, garantizamos una experiencia única para cantantes aficionados y profesionales por igual.<br>Nuestro objetivo es brindar un espacio donde amigos, familias y compañeros de trabajo puedan disfrutar, celebrar y liberar su estrella interior.<br>Además, ofrecemos paquetes especiales para eventos, fiestas y reuniones corporativas, adaptándonos a las necesidades de cada cliente.<br>En Cántame Otra, la música es el alma de la diversión. ¡Ven y haz que tu voz brille! 🎤✨';
        Boton.innerHTML = 'Leer menos';
    } else {
        Mostrar.innerHTML = 'Cántame Otra es una empresa dedicada a ofrecer experiencias inolvidables de karaoke, combinando tecnología de punta con un ambiente vibrante y acogedor.';
        Boton.innerHTML = 'Leer más';
    }
  }