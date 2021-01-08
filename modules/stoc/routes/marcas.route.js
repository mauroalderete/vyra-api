const express = require('express');

let route = express();

route.get('/', (req,res) => {
    res.json({
        marcas: 'lista de marcas'
    })
})

module.exports = { route };