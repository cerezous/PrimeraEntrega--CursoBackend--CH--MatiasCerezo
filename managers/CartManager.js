const fs = require('fs');
const path = require('path');

class CartManager {
  constructor(filename = 'carts.json') {
    this.filePath = path.join(__dirname, '..', filename);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
  }

  getAll() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  getById(id) {
    const carts = this.getAll();
    return carts.find(c => String(c.id) === String(id));
  }

  add() {
    const carts = this.getAll();
    const newId = carts.length > 0 ? (parseInt(carts[carts.length - 1].id) + 1) : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  addProductToCart(cartId, productId) {
    const carts = this.getAll();
    const cart = carts.find(c => String(c.id) === String(cartId));
    if (!cart) return null;
    const prod = cart.products.find(p => String(p.product) === String(productId));
    if (prod) {
      prod.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
