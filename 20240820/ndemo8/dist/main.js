var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import ProductData from './data/ProductData.js';
const PORT = 3030;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.get('/', (request, response) => {
    //response.status(200).send('Hello World');
    response.render('home/index', { titulo: 'Welcome Page' });
});
app.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(request.query);
    console.log(request.body.filter);
    const pD = new ProductData();
    const products = (yield pD.search((_a = request.body.filter) !== null && _a !== void 0 ? _a : '')) || [];
    console.log(products);
    response.render('home/index', { titulo: 'Welcome Page', data: products });
}));
app.listen(PORT, () => { console.log('Server running at PORT: ', PORT); });
