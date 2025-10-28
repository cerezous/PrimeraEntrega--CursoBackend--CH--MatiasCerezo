const express = require('express');
const router = express.Router();


const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', (req, res) => {
  try {
    const productos = productManager.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los productos' });
  }
});

// Busqué videos para ver como se hacía lo de :pid y por lo que probé andaba bien 

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
	const { pid } = req.params;
	const producto = productManager.getById(pid);
	if (!producto) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	}
	res.json(producto);
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
	const { title, description, code, price, status, stock, category, thumbnails } = req.body;
	if (!title || !description || !code || price == null || status == null || stock == null || !category || !Array.isArray(thumbnails)) {
		return res.status(400).json({ error: 'Faltan campos obligatorios o formato incorrecto' });
	}
	const nuevoProducto = productManager.add({
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails
	});
	res.status(201).json(nuevoProducto);
});

// Actualizar un producto por ID
router.put('/:pid', (req, res) => {
	const { pid } = req.params;
	const updates = { ...req.body };
	if ('id' in updates) delete updates.id;
	const actualizado = productManager.update(pid, updates);
	if (!actualizado) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	}
	res.json(actualizado);
});

// Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
	const { pid } = req.params;
	const eliminado = productManager.delete(pid);
	if (!eliminado) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	}
	res.json({ message: `Producto con id ${pid} eliminado` });
});

module.exports = router;
