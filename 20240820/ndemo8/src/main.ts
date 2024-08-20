import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import ProductData from './data/ProductData.js';

const PORT = 3030;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars',engine())
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (request: Request, response: Response) => {
    //response.status(200).send('Hello World');
    response.render('home/index', {titulo: 'Welcome Page'});
})

app.post('/', async (request: Request, response: Response) => {
    console.log(request.query)
    console.log(request.body.filter)

    const pD = new ProductData();

    const products = (await pD.search(request.body.filter ?? '')) || [];
  
    console.log(products);  

    response.render('home/index', {titulo: 'Welcome Page', data: products});
})

app.listen(PORT, () => {console.log('Server running at PORT: ', PORT);})