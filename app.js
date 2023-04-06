const express = require('express');
const ProductManager = require("./tercerDesafio_Casarino.js");

const app = express();
const port = 8080;

const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const products = await productManager.getProducts(limit);
      res.json(products);
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productManager.getProductById(id);

      if (!product) {
        return console.error('Product not found' + error);
      }
      else{
        res.json(product);
      }
    } 
    catch (error) {
      console.error(error);
    }
  });

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ` + port);
  });