const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db/connection')
const session = require('express-session')
const router = require('./routes/routes')
require('dotenv').config({ path: '../.env' })

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(router)

app.get('/test', (req, res) => {
    if (session.ime) {
        res.json({
            hello: 'Ola',
            ime: session.ime
        })
    } else {
        res.sendStatus(403)
    }
})

app.post('/test/login', (req, res) => {
    const users = db.get('users')

    users.findOne({ username: 'radovan' })
        .then(data => {
            if (data) {
                session.ime = data.username
                res.json({
                    ime_sesije: session.ime
                })
            } else {
                res.sendStatus(403)
            }
        }).catch(err => console.log(err)
        )
})

app.listen(port, () => {
    console.log(`Slušam port ${port}`)
})