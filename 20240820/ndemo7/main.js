import express from 'express';

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World *' + new Date().toISOString())
})

console.log('Server running at http://localhost:3000/') 
app.listen(3000)