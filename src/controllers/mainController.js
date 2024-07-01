const {conn} = require('../db/dbconnect');

module.exports = {
    getProductos: async (req, res) => {
        try {
            const [registro] = await conn.query(`
                SELECT 
                    p.id_producto, p.nombre, p.precio, p.descripcion, p.stock,
                    c.nombre AS categoria_nombre, 
                    pr.promos AS promos_nombre, pr.descuento AS promos_descuento, pr.dias AS promos_dias,
                    cu.cuotas AS cuotas_nombre, cu.interes AS cuotas_interes
                FROM Producto p
                LEFT JOIN Categoria c ON p.fk_categoria = c.id_categoria
                LEFT JOIN Promos pr ON p.fk_promos = pr.id_promos
                LEFT JOIN Cuotas cu ON p.fk_cuotas = cu.id_cuotas
            `);
            res.json(registro);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getProductoPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [registro] = await conn.query(`
                SELECT 
                    p.id_producto, p.nombre, p.precio, p.descripcion, p.stock,
                    c.nombre AS categoria_nombre, 
                    pr.promos AS promos_nombre, pr.descuento AS promos_descuento, pr.dias AS promos_dias,
                    cu.cuotas AS cuotas_nombre, cu.interes AS cuotas_interes
                FROM Producto p
                LEFT JOIN Categoria c ON p.fk_categoria = c.id_categoria
                LEFT JOIN Promos pr ON p.fk_promos = pr.id_promos
                LEFT JOIN Cuotas cu ON p.fk_cuotas = cu.id_cuotas
                WHERE p.id_producto = ?
            `, [id]);
            res.json(registro[0]);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    crearRegistro: async (req, res) => {
        const { nombre, precio, descripcion, stock, fk_categoria, fk_promos, fk_cuotas } = req.body;
        try {
            await conn.query(`
                INSERT INTO Producto (nombre, precio, descripcion, stock, fk_categoria, fk_promos, fk_cuotas)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [nombre, precio, descripcion, stock, fk_categoria, fk_promos, fk_cuotas]);
            res.redirect('/admin.html'); // Redireccionamiento después de crear el producto
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    
    actualizar: async (req, res) => {
        const { id, nombre, precio, descripcion, stock, fk_categoria, fk_promos, fk_cuotas} = req.body;
        try {
            await conn.query(`
                UPDATE Producto
                SET nombre = ?, precio = ?, descripcion = ?, stock = ?, fk_categoria = ?, fk_promos = ?, fk_cuotas = ?
                WHERE id_producto = ?
            `, [nombre, precio, descripcion, stock, fk_categoria, fk_promos, fk_cuotas, id]);
            res.send('Producto actualizado');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    
    eliminar: async (req, res) => {
        const { idEliminar } = req.body;
        try {
            await conn.query('DELETE FROM Producto WHERE id_producto = ?', [idEliminar]);
            res.redirect('/admin.html'); // Redireccionamiento después de eliminar el producto
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    
};
