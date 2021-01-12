const express = require('express');
const MarcaContext = require('../contexts/marca.context');
const Marca = require('../models/marca.model');

const route = express();

//select all marcas
route.get('/', (req,res) => {

    const context = new MarcaContext()

    context.select().then( marcas => {
        res.status(200).send( marcas )
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    } )
})

//select one marca
route.get('/:id', (req,res) => {

    const context = new MarcaContext()

    context.selectById( req.params.id ).then( marca => {
        if( marca==null){
            res.status(404).send(`La marca ${req.params.id} no existe`)
        } else {
            res.status(200).send( marca )
        }        
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    } )
})

//insert one marca
route.post('/', (req, res)=>{

    const context = new MarcaContext()

    context.insert( req.body ).then( marca => {
        res.status(200).send( marca )
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    })
})

//update one marca
route.put('/:id', (req,res) => {

    const context = new MarcaContext()

    const marca = new Marca(req.body)

    if( marca.marca != req.params.id ){
        res.status(400).send('La marca a actualizar no coincide con los datos que se busca actualizar')
        return
    }
    context.update( marca ).then( marca => {
        if(marca == null || marca == undefined){
            res.status(404).send(`Marca ${req.params.id} no fue encontrada`)
        } else {
            res.status(200).send( marca )
        }
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    } )
})

//delete one marca
route.delete('/:id', (req,res) => {

    const context = new MarcaContext()
    const marca = new Marca()
    marca.marca = req.params.id

    context.delete( marca ).then( (result) => {
        if(result == null || result == undefined ){
            res.status(404).send(`Marca ${req.params.id} no fue encontrada`)
        } else {
            res.status(200).send()
        }
    } ).catch( reason => {
        res.status(400).send(reason)
        console.error('[ERROR:Context] ', reason)
    } )
})

module.exports = { route };