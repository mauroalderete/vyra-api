const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')

const login = require('./modules/login/routes/login.route.js')
const authMiddleware = require('./modules/login/middleware/auth.middleware.js')
const marcas = require('./modules/stoc/stoc_marcas/routes/marcas.route.js')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.use( bodyParser.urlencoded( { extended: true }) )
app.use( bodyParser.json() )
app.use('/api/login', login.route )
app.use('/api/marcas', authMiddleware, marcas.route)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
