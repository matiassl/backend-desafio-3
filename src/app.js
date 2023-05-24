import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

const Productos = new ProductManager('./products.json');
// await Productos.addProduct2('fideos', 'moño', '100', 'img', '522872', '1');
// await Productos.addProduct2('atun', 'lomito de atun', '799', 'img', '956327', '10');
// await Productos.addProduct2('jabon', 'jabon liquido', '1700', 'img', '087143', '5');
// await Productos.addProduct2('harina', '000', '200', 'img', '647182', '3');

app.get('/', async (request, response) => {
    response.send('Desafio 3')
})


app.get('/products', async (request, response) => {
    const { limit } = request.query;

    let products = await Productos.getProducts();

    if (limit) {
        const limitNumber = parseInt(limit);
        products = products.slice(0, limitNumber);
    }

    response.send(products);
});

app.get('/product/:pid', async (request, response) => {
    const pid = request.params.pid;
    const item = await Productos.getProductById(pid);

    if (item) {
        return response.send(item);
    }
    else {
        return response.send(` El producto con id: ${pid}  no existe`);
    }
})

app.listen(8080, () => {
    console.log('Server up');
})

//node src/app.js 