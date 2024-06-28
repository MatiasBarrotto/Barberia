document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:8080/api/turnos');
        const datos = await res.json();
        let turnosHTML = document.querySelector('#turnos');
        turnosHTML.innerHTML = '';
        datos.forEach(registro => {
            turnosHTML.innerHTML += `
                <tr>
                    <td>${registro.nombre}</td>
                    <td>${registro.apellido}</td>
                    <td>${registro.telefono}</td>
                    <td>${registro.mail}</td>
                    <td>${registro.sucursal}</td>
                    <td>${registro.barbero}</td>
                    <td>${registro.fecha_turno}</td>
                    <td>${registro.hora_turno}</td>
                    <td>${registro.servicio}</td>
                    <td>
                        <button class="btn btn-warning modificar" data-id="${registro.id}">Modificar</button>
                        <button class="btn btn-danger eliminar" data-id="${registro.id}">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error('Error al cargar turnos:', error);
    }
});

document.querySelector('#turnos').addEventListener('click', async (event) => {
    if (event.target.classList.contains('modificar')) {
        const id = event.target.dataset.id;
        try {
            const res = await fetch(`/api/turnos/${id}`);
            const datos = await res.json();
            document.querySelector('#editForm #id').value = datos.id;
            document.querySelector('#editForm #nombre').value = datos.nombre;
            document.querySelector('#editForm #apellido').value = datos.apellido;
            document.querySelector('#editForm #telefono').value = datos.telefono;
            document.querySelector('#editForm #mail').value = datos.mail;
            document.querySelector('#editForm #sucursal').value = datos.sucursal;
            document.querySelector('#editForm #barbero').value = datos.barbero;
            document.querySelector('#editForm #fecha_turno').value = datos.fecha_turno;
            document.querySelector('#editForm #hora_turno').value = datos.hora_turno;
            document.querySelector('#editForm #servicio').value = datos.servicio;
            new bootstrap.Modal(document.querySelector('#editModal')).show();
        } catch (error) {
            console.error('Error al cargar datos para modificar:', error);
        }
    }

    if (event.target.classList.contains('eliminar')) {
        const id = event.target.dataset.id;
        try {
            await fetch(`/api/turnos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ idEliminar: id })
            });
            event.target.closest('tr').remove();
        } catch (error) {
            console.error('Error al eliminar turno:', error);
        }
    }
});

document.querySelector('#editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);


    try {
        await fetch('/api/turnos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        });
        new bootstrap.Modal(document.querySelector('#editModal')).hide();
        document.dispatchEvent(new Event('DOMContentLoaded')); 
    } catch (error) {
        console.error('Error al actualizar turno:', error);
    }
});
