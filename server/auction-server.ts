import * as express from 'express'
import { Server } from 'ws';

const app = express();

export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>) {
    }
}

const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 2.11, '这是第一个商品，是我在学习慕课网Angular入门实战时创建的第一个商品', ['3C', '电脑']),
    new Product(2, '第二个商品', 2.99, 3.52, '这是第二个商品，是我在学习慕课网Angular入门实战时创建的第二个商品', ['3C', '手机']),
    new Product(3, '第三个商品', 3.99, 1.53, '这是第三个商品，是我在学习慕课网Angular入门实战时创建的第三个商品', ['3C', '相机']),
    new Product(4, '第四个商品', 4.99, 3.54, '这是第四个商品，是我在学习慕课网Angular入门实战时创建的第四个商品', ['家电', '冰箱']),
    new Product(5, '第五个商品', 5.99, 4.55, '这是第五个商品，是我在学习慕课网Angular入门实战时创建的第五个商品', ['家电', '电视机']),
    new Product(6, '第六个商品', 6.99, 3.56, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的第六个商品', ['家电', '洗衣机']),
    new Product(7, '第七个商品', 6.99, 3.56, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的第六个商品', ['家电', '洗衣机'])
];

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    console.log(req.params.id);
    res.json(products.find((product) => product.id === Number(req.params.id)));
});

const server = app.listen(8000, 'localhost', () => {
    console.log('服务器已经启动，地址是：http://localhost:8000/')
});

const wsServer = new Server({ port: 8085 });
// 当有客户端连接到服务器的8085端口时，给客户端推送消息
wsServer.on('connection', websocket => {
    websocket.send('这个消息是服务器主动推送的。');
    websocket.on('message', message => {
        console.log('接收到消息：' + message)
    });
})

setInterval(() => {
    if (wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send('这是定时推送');
        })
    }
}, 2000);
