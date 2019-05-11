const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db/connection')





router.get('/', (req, res) => {
    const obj = {
        msg: 'Here wo go!'
    }
    req.headers['authorization'] = 'Large'
    res.json(req.headers)

})

router.post('/users', (req, res) => {
    const users = db.get('users')
    const postData = req.body

    users.insert(postData)
        .then(user => res.json(user))
        .catch(err => console.log(err))

})

router.get('/users', (req, res) => {
    const users = db.get('users')

    users.find()
        .then(response => res.json(response))
        .catch(err => console.error(err))
})

router.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'shhhhhh', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json(
                
                req.headers /*
                {
                    msg: 'Post created....',
                    authData
                }*/)
        }
    })

})

router.post('/api/login', (req, res) => {
    const users = db.get('users')
    const juzer = 'radovan'
    users.findOne({ username: juzer })
        .then(user => {
            if (user) {
                jwt.sign({ user }, 'shhhhhh', (err, token) => {
                    res.json(token)
                })
            } else {
                res.json('Invalid')
            }
        })
})

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    console.log('Ovo je ' + bearerHeader);

    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at space
        const bearer = bearerHeader.split(' ')
        //Get token from array
        const bearer_token = bearer[1]
        // Set the token
        req.token = bearer_token
        //Next middleware
        next()
    } else {

        res.sendStatus(403)
    }
}


module.exports = router