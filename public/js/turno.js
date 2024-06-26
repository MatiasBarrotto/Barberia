// Cargar y mostrar los turnos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:8080/api/turnos');
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


