const path = require('path');
app.use('/img', express.static(path.join(__dirname, 'img'))); //con esto podremos usar las imágenes de img
const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
	console.log('Servidor escuchando en puerto 8080');
});