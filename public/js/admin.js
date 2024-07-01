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
                    <td>${registro.precio}</td>
                    <td>${registro.descripcion}</td>
                    <td>${registro.stock}</td>
                    <td>${registro.categoria_nombre}</td>
                    <td>${registro.promos_nombre}</td>
                    <td>${registro.cuotas_nombre}</td>
                    <td>
                        <button class="btn btn-warning modificar" data-id="${registro.id_producto}">Modificar</button>
                        <button class="btn btn-danger eliminar" data-id="${registro.id_producto}">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});

document.querySelector('#turnos').addEventListener('click', async (event) => {
    if (event.target.classList.contains('modificar')) {
        const id = event.target.dataset.id;
        try {
            const res = await fetch(`/api/turnos/${id}`);
            const datos = await res.json();
            document.querySelector('#editForm #id').value = datos.id_producto;
            document.querySelector('#editForm #nombre').value = datos.nombre;
            document.querySelector('#editForm #precio').value = datos.precio;
            document.querySelector('#editForm #descripcion').value = datos.descripcion;
            document.querySelector('#editForm #stock').value = datos.stock;
            document.querySelector('#editForm #categoria').value = datos.categoria_nombre;
            document.querySelector('#editForm #promo').value = datos.promos_nombre;
            document.querySelector('#editForm #cuotas').value = datos.cuotas_nombre;
            new bootstrap.Modal(document.querySelector('#editModal')).show();
        } catch (error) {
            console.error('Error al cargar producto:', error);
        }
    }
});

document.querySelector('#turnos').addEventListener('click', async (event) => {
    if (event.target.classList.contains('eliminar')) {
        const id = event.target.dataset.id;
        try {
            await fetch(`/api/turnos/${id}`, {
                method: 'DELETE',
            });
            location.reload();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
});

document.querySelector('#createForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
    try {
        await fetch('/api/turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        });
        location.reload();
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
});

document.querySelector('#editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());
    const id = datos.id_producto;
    delete datos.id_producto;
    try {
        await fetch(`/api/turnos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        });
        location.reload();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
});
