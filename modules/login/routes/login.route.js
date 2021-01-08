const express = require('express');
const jwt = require('jsonwebtoken')
const UserModel = require('../../../models/user.model')

const mauro = new UserModel('mauro', '123456', process.env.UID)
const sergio = new UserModel('sergio', '123456', process.env.UID)

let route = express();

route.post('/', (req,res) => {

    const user = new UserModel( req.body )

    if( user.equal( mauro ) || user.equal( sergio ) ){

        console.log(Date.now())
        const token = jwt.sign(
            { user: user, timestamp: Date.now() },
            process.env.TOKEN_SECRET,
            {
                expiresIn: parseInt(process.env.EXPIRE_JWT, 10) || 1440
            }
        )

        res.json({
            response: "Autenticación correcta",
            token
        });

    } else {
        res.status(400).send('Acceso invalido')
    }
});

module.exports = { route };