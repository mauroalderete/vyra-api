const express = require('express');
const jwt = require('jsonwebtoken')

const auth = express.Router();

auth.use( (req, res, next)=> {
    let token = req.headers['authorization']

    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.TOKEN_SECRET, (result, dec) => {
        if(result){
            res.status(401).send('Acceso no autorizado')
        } else {
            next()
        }
    })
} )

module.exports = auth