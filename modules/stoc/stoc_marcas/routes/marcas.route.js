const express = require('express');
const MarcaContext = require('../contexts/marca.context')

const route = express();

route.get('/', (req,res) => {

    const context = new MarcaContext()

    context.select().then( marcas => {
        res.status(200).send( marcas )
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    } )
})

route.post('/', (req, res)=>{

    const context = new MarcaContext()

    context.insert( req.body ).then( marca => {
        res.status(200).send( marca )
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    })
})

module.exports = { route };