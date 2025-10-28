const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();
const express = require('express');
const router = express.Router();


// Crear un nuevo carrito
router.post('/', (req, res) => {
	const nuevoCarrito = cartManager.add();
	res.status(201).json(nuevoCarrito);
});

// Obtener un carrito por ID
router.get('/:cid', (req, res) => {
	const { cid } = req.params;
	const carrito = cartManager.getById(cid);
	if (!carrito) {
		return res.status(404).json({ error: 'Carrito no encontrado' });
	}
	res.json(carrito.products);
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
	const { cid, pid } = req.params;
	const carrito = cartManager.addProductToCart(cid, pid);
	if (!carrito) {
		return res.status(404).json({ error: 'Carrito no encontrado' });
	}
	res.json(carrito);
});

module.exports = router;
