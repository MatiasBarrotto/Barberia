document.querySelector('body').onload = async () => {
	const res = await fetch(`http://localhost:8080/turnos`)
	const datos = await res.json()
	let listaHTML = document.querySelector(`#turnos`)
	listaHTML.innerHTML = ''
	datos.forEach(registro => {
		listaHTML.innerHTML += `
		<form method="POST" action="/turnos?_metodo=DELETE" style="display:flex">
			<h4>${registro.nombre}</h4>
			<h4>${registro.apellido}</h4>
			<h4>${registro.telefono}</h4>
			<h4>${registro.mail}</h4>
		<h4>${registro.fecha_turno}</h4>
		<h4>${registro.hora_turno}</h4>
			<input type="hidden" name="idEliminar" value="${registro.id}">
			<h4><button><a href="/modificar/${registro.id}">Modificar</a></h4>
			<h4><input type="submit" value="Eliminar"></h4>
		</form>`
	})
}