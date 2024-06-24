const express = require('express')
const override = require('method-override')
const rutas = require('./src/routes/mainRoutes.js')
const app = express()

const port = 8080 || process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(override('_metodo'))

app.use('/', rutas)

app.use((req, res, next) =>{
  res.status(404).send('<h1 style="color: red">Recurso no encontrado!</h1>')
})

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })

app.listen(port, () => {
  console.log(`Estoy arriba en el ${port}`)   
})

