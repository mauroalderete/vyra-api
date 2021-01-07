const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')

const login = require('./routes/api/login.route.js')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.use( bodyParser.urlencoded( { extended: true }) )
app.use( bodyParser.json() )
app.use('/api/login', login.route )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
