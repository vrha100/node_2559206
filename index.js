const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const puerto = 8087

//Servidor de contenido estatico
app.use(express.static('public'))


//Configuración del directorio de las vistas hbs
app.set('views', path.join(__dirname + '/public/views'))
app.set('view engine', 'hbs')


//Configuración del directorio que guardará los archivos partials hbs
hbs.registerPartials(__dirname + '/public/views/partials');


app.get('/', (req, res) => {
    res.render('home',
        {
            titulo: 'home',
            nombre: 'Diego Lopez'
        })
})

app.get('/productos', (req, res) => {
    res.render('productos',
        {
            titulo: 'Listado prodcutos',
            nombre: 'Diego Lopez',
            rol: 'Admin'
        })
})

app.get('/clientes', (req, res) => {
    res.render('clientes',
        {
            titulo: 'Listado prodcutos',
            nombre: 'Diego Lopez',
            rol: 'Admin'
        })
})

app.listen(puerto, () => {
    console.log(`Escuchando por el puerto ${puerto}`)
})