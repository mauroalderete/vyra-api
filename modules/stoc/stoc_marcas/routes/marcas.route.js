const express = require('express');

let route = express();

route.get('/', (req,res) => {
    res.json({
        marcas: 'lista de marcas'
    })

    try{

    } catch(err){
        console.error(err);
        res.status(409).send('Error: ' + err)
    }
})

module.exports = { route };