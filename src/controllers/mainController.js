const { conn } = require('../db/dbconnect');

module.exports = {
    getTurnos: async (req, res) => {
        try {
            const [registros] = await conn.query('SELECT * FROM Turnos');
            res.json(registros);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getTurnoPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [registro] = await conn.query('SELECT * FROM Turnos WHERE id = ?', [id]);
            res.json(registro[0]);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    

    crearRegistro: async (req, res) => {
        const { nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, servicio } = req.body;
        try {
            await conn.query('INSERT INTO Turnos (nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, servicio]);
            res.redirect('/turnos.html');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    actualizar: async (req, res) => {
        const { id, nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, servicio } = req.body;
        try {
            await conn.query('UPDATE Turnos SET nombre = ?, apellido = ?, codigo_pais = ?, telefono = ?, mail = ?, sucursal = ?, barbero = ?, fecha_turno = ?, hora_turno = ?, servicio = ? WHERE id = ?', [nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, servicio, id]);
            res.send('Turno actualizado');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    
    eliminar: async (req, res) => {
        const { idEliminar } = req.body;
        try {
            await conn.query('DELETE FROM Turnos WHERE id = ?', [idEliminar]);
            res.redirect('/turnos.html');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
