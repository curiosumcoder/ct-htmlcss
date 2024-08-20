import express from 'express';
import { engine } from 'express-handlebars';
const PORT = 3030;
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.get('/', (request, response) => {
    //response.status(200).send('Hello World');
    response.render('home/index', { titulo: 'Welcome Page' });
});
app.listen(PORT, () => { console.log('Server running at PORT: ', PORT); });
