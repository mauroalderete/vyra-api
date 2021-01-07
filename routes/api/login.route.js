const express = require('express');
const jwt = require('jsonwebtoken')

let route = express();

route.post('/', (req,res) => {

    console.log('body: ', req.body)

    res.json({
        response: 'Ok'
    })
});

module.exports = { route };