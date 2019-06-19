"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
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
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, username, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.username = username;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 1.99, 2.11, '这是第一个商品，是我在学习慕课网Angular入门实战时创建的第一个商品', ['3C', '电脑']),
    new Product(2, '第二个商品', 2.99, 3.52, '这是第二个商品，是我在学习慕课网Angular入门实战时创建的第二个商品', ['3C', '手机']),
    new Product(3, '第三个商品', 2.99, 1.53, '这是第三个商品，是我在学习慕课网Angular入门实战时创建的第三个商品', ['3C', '相机']),
    new Product(4, '第四个商品', 4.99, 3.54, '这是第四个商品，是我在学习慕课网Angular入门实战时创建的第四个商品', ['家电', '冰箱']),
    new Product(5, '第五个商品', 5.99, 4.55, '这是第五个商品，是我在学习慕课网Angular入门实战时创建的第五个商品', ['家电', '电视机']),
    new Product(6, '第六个商品', 2.99, 3.56, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的第六个商品', ['家电', '洗衣机']),
    new Product(7, '第七个商品', 5.99, 3.56, '这是第七个商品，是我在学习慕课网Angular入门实战时创建的第七个商品', ['家电', '洗衣机'])
];
var comments = [
    new Comment(1, 1, '2019/03/03 12:00:12', '小李', 1, '差評'),
    new Comment(1, 2, '2019/03/03 12:11:12', '小孫', 1, '差評'),
    new Comment(1, 3, '2019/03/03 12:22:12', '小王', 1, '差評'),
    new Comment(1, 4, '2019/03/03 12:33:12', 'Coco', 0, '差評'),
    new Comment(1, 5, '2019/03/03 12:44:12', 'Tom', 0, '差評'),
    new Comment(1, 6, '2019/03/03 12:55:12', 'Jerry', 0, '差評'),
    new Comment(1, 7, '2019/03/03 12:06:12', 'Lily', 0, '差評'),
    new Comment(2, 1, '2019/03/03 14:00:12', '小李', 4, '好評'),
    new Comment(2, 2, '2019/03/03 14:11:12', '小孫', 4, '好評'),
    new Comment(2, 3, '2019/03/03 14:22:12', '小王', 4, '好評'),
    new Comment(2, 4, '2019/03/03 14:33:12', 'Coco', 5, '好評'),
    new Comment(2, 5, '2019/03/03 14:44:12', 'Tom', 5, '好評'),
    new Comment(2, 6, '2019/03/03 14:55:12', 'Jerry', 5, '好評'),
    new Comment(2, 7, '2019/03/03 14:06:12', 'Lily', 5, '好評')
];
app.get('/', function (req, res) {
    res.send('Hello Express');
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    console.log(req.query);
    console.log('Search params' + JSON.stringify(params));
    if (params.title) {
        console.log('1');
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        console.log('2');
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.categroy && params.categroy !== '-1' && result.length > 0) {
        console.log('3');
        result = result.filter(function (p) { return p.categories.indexOf(params.categroy) !== -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id === Number(req.params.id); }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (conmment) { return conmment.productId === Number(req.params.id); }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已经启动，地址是：http://localhost:8000/');
});
var wsServer = new ws_1.Server({ port: 8085 });
// 当有客户端连接到服务器的8085端口时，给客户端推送消息
wsServer.on('connection', function (websocket) {
    websocket.send('这个消息是服务器主动推送的。');
    websocket.on('message', function (message) {
        console.log('接收到消息：' + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send('这是定时推送');
        });
    }
}, 2000);
