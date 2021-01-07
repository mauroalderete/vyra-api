const express = require('express');

let route = express();

route.get('/', (req,res,next) => {

    console.log('req: ', req.body)

    res.json({
        response: 'Ok'
    })
});

module.exports = { route };