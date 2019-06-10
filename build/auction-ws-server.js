"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, 'WebSocket服务的第一个商品', 1.99, 2.11, '这是第一个商品，是我在学习慕课网Angular入门实战时创建的第一个商品', ['3C', '电脑']),
    new Product(2, 'WebSocket服务的第二个商品', 2.99, 3.52, '这是第二个商品，是我在学习慕课网Angular入门实战时创建的第二个商品', ['3C', '手机']),
    new Product(3, 'WebSocket服务的第三个商品', 3.99, 1.53, '这是第三个商品，是我在学习慕课网Angular入门实战时创建的第三个商品', ['3C', '相机']),
    new Product(4, 'WebSocket服务的第四个商品', 4.99, 3.54, '这是第四个商品，是我在学习慕课网Angular入门实战时创建的第四个商品', ['家电', '冰箱']),
    new Product(5, 'WebSocket服务的第五个商品', 5.99, 4.55, '这是第五个商品，是我在学习慕课网Angular入门实战时创建的第五个商品', ['家电', '电视机']),
    new Product(6, 'WebSocket服务的第六个商品', 6.99, 3.56, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的第六个商品', ['家电', '洗衣机']),
    new Product(7, 'WebSocket服务的第七个商品', 6.99, 3.56, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的第六个商品', ['家电', '洗衣机'])
];
app.get('/', function (req, res) {
    res.send('Hello Express');
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    console.log(req.params.id);
    res.json(products.find(function (product) { return product.id === Number(req.params.id); }));
});
