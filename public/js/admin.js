document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:8080/api/productos');
        const datos = await res.json();
        cargarProductos(datos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});

function cargarProductos(datos) {
    let productosHTML = document.querySelector('#productos');
    productosHTML.innerHTML = '';
    datos.forEach(registro => {
        productosHTML.innerHTML += `
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
}
document.querySelector('#productos').addEventListener('click', async (event) => {
    if (event.target.classList.contains('modificar')) {
        const id = event.target.dataset.id;
        try {
            const res = await fetch(`/api/productos/${id}`);
            const datos = await res.json();
            document.querySelector('#editForm #id').value = datos.id_producto;
            document.querySelector('#editForm #nombre').value = datos.nombre;
            document.querySelector('#editForm #precio').value = datos.precio;
            document.querySelector('#editForm #descripcion').value = datos.descripcion;
            document.querySelector('#editForm #stock').value = datos.stock;
            document.querySelector('#editForm #fk_categoria').value = datos.fk_categoria;
            document.querySelector('#editForm #fk_promos').value = datos.fk_promos;
            document.querySelector('#editForm #fk_cuotas').value = datos.fk_cuotas;
            new bootstrap.Modal(document.querySelector('#editModal')).show();
        } catch (error) {
            console.error('Error al cargar datos para modificar:', error);
        }
    }

    if (event.target.classList.contains('eliminar')) {
        const id = event.target.dataset.id;
        try {
            await fetch(`/api/productos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ idEliminar: id })
            });
            event.target.closest('tr').remove();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
});
document.querySelector('#createForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        await fetch('/api/productos', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });
        const res = await fetch('http://localhost:8080/api/productos');
        const datos = await res.json();
        cargarProductos(datos);
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
});

document.querySelector('#editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        await fetch('/api/productos', {
            method: 'PUT',
            body: new URLSearchParams(formData)
        });
        new bootstrap.Modal(document.querySelector('#editModal')).hide();
        const res = await fetch('http://localhost:8080/api/productos');
        const datos = await res.json();
        cargarProductos(datos);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
});
