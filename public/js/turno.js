// Cargar y mostrar los turnos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:8080/turnos');
        const datos = await res.json();
        let turnosHTML = document.querySelector('#turnos');
        turnosHTML.innerHTML = '';
        datos.forEach(registro => {
            turnosHTML.innerHTML += `
                <form method="POST" action="/api/turnos?_metodo=DELETE" style="display:flex">
                    <h4>${registro.nombre}</h4>
                    <h4>${registro.apellido}</h4>
                    <h4>${registro.telefono}</h4>
                    <h4>${registro.mail}</h4>
                    <h4>${registro.sucursal}</h4>
                    <h4>${registro.barbero}</h4>
                    <h4>${registro.fecha_turno}</h4>
                    <h4>${registro.hora_turno}</h4>
                    <input type="hidden" name="idEliminar" value="${registro.id}">
                    <h4><a href="#" class="modificar" data-id="${registro.id}">Modificar</a></h4>
                    <h4><input type="submit" value="Eliminar"></h4>
                </form>`;
        });
    } catch (error) {
        console.error('Error al cargar turnos:', error);
    }
});

// Manejar eliminación de turnos
document.querySelector('#turnos').addEventListener('submit', async (event) => {
    if (event.target.action.includes('_metodo=DELETE')) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const idEliminar = formData.get('idEliminar');

        try {
            await fetch('/turnos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ idEliminar })
            });
            form.parentElement.remove(); // Eliminar el formulario del DOM
        } catch (error) {
            console.error('Error al eliminar turno:', error);
        }
    }
});

// Manejar modificación de turnos
document.querySelector('#turnos').addEventListener('click', async (event) => {
    if (event.target.classList.contains('modificar')) {
        event.preventDefault();
        const id = event.target.dataset.id;

        try {
            const res = await fetch(`/turnos/${id}`);
            const datos = await res.json();

            // Cargar datos en el formulario de edición (supongamos que tienes un formulario con id="editForm")
            document.querySelector('#editForm #id').value = datos.id;
            document.querySelector('#editForm #nombre').value = datos.nombre;
            document.querySelector('#editForm #apellido').value = datos.apellido;
            document.querySelector('#editForm #telefono').value = datos.telefono;
            document.querySelector('#editForm #mail').value = datos.mail;
            document.querySelector('#editForm #sucursal').value = datos.sucursal;
            document.querySelector('#editForm #barbero').value = datos.barbero;
            document.querySelector('#editForm #fecha_turno').value = datos.fecha_turno;
            document.querySelector('#editForm #hora_turno').value = datos.hora_turno;

            // Mostrar el modal o la sección de edición
            document.querySelector('#editModal').style.display = 'block';
        } catch (error) {
            console.error('Error al cargar datos para modificar:', error);
        }
    }
});

// Enviar cambios modificados
document.querySelector('#editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        await fetch('/turnos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        });
        // Cerrar el modal y recargar la lista de turnos
        document.querySelector('#editModal').style.display = 'none';
        document.dispatchEvent(new Event('DOMContentLoaded')); // Recargar los turnos
    } catch (error) {
        console.error('Error al actualizar turno:', error);
    }
});




