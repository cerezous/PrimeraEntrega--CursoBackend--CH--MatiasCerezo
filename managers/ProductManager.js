const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filename = 'products.json') {
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
    const products = this.getAll();
    return products.find(p => String(p.id) === String(id));
  }

  add(product) {
    const products = this.getAll();
    const newId = products.length > 0 ? (parseInt(products[products.length - 1].id) + 1) : 1;
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  update(id, updates) {
    const products = this.getAll();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const { id: _, ...rest } = products[idx];
    products[idx] = { id: products[idx].id, ...rest, ...updates };
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    return products[idx];
  }

  delete(id) {
    let products = this.getAll();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    products.splice(idx, 1);
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    return true;
  }
}

module.exports = ProductManager;
