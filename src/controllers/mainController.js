const { conn } = require('../db/dbconnect');

module.exports = {
    getTurnos: async (req, res) => {
        try {
            const [registros] = await conn.query('SELECT * FROM Turnos');
            res.json(registros);
        } catch (error) {
            throw error
        } finally{
            conn.releaseConnection()
        }
    },

    crearRegistro: async (req, res) => {
        const { nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno } = req.body;
        try {
            await conn.query('INSERT INTO Turnos (nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                 [nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno]);
            res.redirect('/api/turnos');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    actualizar: async (req, res) => {
        const { id, nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno } = req.body;
        try {
            await conn.query('UPDATE Turnos SET nombre = ?, apellido = ?, codigo_pais = ?, telefono = ?, mail = ?, sucursal = ?, barbero = ?, fecha_turno = ?, hora_turno = ? WHERE id = ?', [nombre, apellido, codigo_pais, telefono, mail, sucursal, barbero, fecha_turno, hora_turno, id]);
            res.send('Turno actualizado');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    eliminar: async (req, res) => {
        const { idEliminar } = req.body;
        try {
            await conn.query('DELETE FROM Turnos WHERE id = ?', [idEliminar]);
            res.redirect('/api/turnos');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
