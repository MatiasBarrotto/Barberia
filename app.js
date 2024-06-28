const express = require('express');
const methodOverride = require('method-override');
const rutas = require('./src/router/mainRoutes');
const app = express();

const port = 8080 || process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_metodo'));
app.use(express.json());
app.use('/', rutas);

app.use((req, res, next) => {
  res.status(404).send('<h1 style="color: red"> Recurso no encontrado! </h1>')
})// mando un mensaje cuando la ruta no se encuentra

app.listen(port, () => {

  console.log(`Hola, estoy arriba en el puerto: ${port}`)   
});