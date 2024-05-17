//validacion membresia
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validar el campo nombre
        const nombre = document.getElementById('nombre').value.trim();
        const nombreError = document.getElementById('nombreError');
        if (nombre === "") {
            nombreError.style.display = 'inline';
            isValid = false;
        } else {
            nombreError.style.display = 'none';
        }

        // Validar el campo apellido
        const apellido = document.getElementById('apellido').value.trim();
        const apellidoError = document.getElementById('apellidoError');
        if (apellido === "") {
            apellidoError.style.display = 'inline';
            isValid = false;
        } else {
            apellidoError.style.display = 'none';
        }

        // Validar el campo teléfono
        const telefono = document.getElementById('telefono').value.trim();
        const telefonoError = document.getElementById('telefonoError');
        if (telefono === "") {
            telefonoError.style.display = 'inline';
            isValid = false;
        } else {
            telefonoError.style.display = 'none';
        }

        // Validar el campo email
        const mail = document.getElementById('mail').value.trim();
        const mailError = document.getElementById('mailError');
        if (mail === "") {
            mailError.style.display = 'inline';
            isValid = false;
        } else {
            mailError.style.display = 'none';
        }

        // Prevenir el envío del formulario si no es válido
        if (!isValid) {
            event.preventDefault();
            alert('Por favor, complete todos los campos obligatorios.');
        }
    });
});



// boton click del menu navbar
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});