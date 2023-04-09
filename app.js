const express = require('express');
const ProductManager = require("./tercerDesafio_Casarino.js");

const app = express();
const port = 8080;

const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtenemos el query param limit (si existe)
    const products = await productManager.getProducts(); 

    if (limit) {
      res.json(products.slice(0, limit)); // Si existe limit, devolvemos sólo los primeros 'limit' productos
    } else {
      res.json(products); // Si no existe limit, devolvemos todos los productos
    }
  } catch (error) {
    console.error(error);
  }
});


app.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);

    if (!product) {
      return console.log('Product not found');
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ` + port);
});