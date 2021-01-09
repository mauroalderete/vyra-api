const express = require('express');
const { Pool } = require('pg')
const MarcaModel = require('../models/marcas.model')
const MarcaQuery = require('../models/marcas.query')

let route = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV == 'production' ? {rejectUnauthorized: false} : ''
})

const aa = new MarcaQuery()

route.get('/', (req,res) => {

    try{
        pool.connect().then( (client) => {

            const marcaQuery = new MarcaQuery()

            client.query( marcaQuery.select() ).then( (result) => {

                const marcas = []

                console.log(result.rows)

                for (const row in result.rows){
                    console.log('ROW::',row)
                    console.log('--------')
                    const marca = marcaQuery.toModel(row)

                    marcas.push(marca)
                }

                res.status(200).send( marcas )
                client.release()
            }).catch( reason => {
                console.error(reason);
                res.status(409).send('[ERROR:Query] ' + reason)
            } )
        }).catch( reason => {
            console.error(reason)
            res.status(409).send('[ERROR:Connect] ' + reason)
        })
    } catch(err){
        console.error(err);
        res.status(409).send('[ERROR:Exception] ' + err)
    }
})

route.post('/', (req, res)=>{

    const marcaQuery = new MarcaQuery( new MarcaModel( req.body ) )

    if( marcaQuery.isInsertable() ){

        try{
            pool.connect().then( (client) => {
                client.query( marcaQuery.insert() ).then( (result) => {
                    console.log('Marca inserted')
                    console.log(result)

                    const marca = marcaQuery.toModel(result.rows[0])

                    res.status(200).send( marca )
                    client.release()
                }).catch( reason => {
                    console.error(reason);
                    res.status(409).send('[ERROR:Query] ' + reason)
                } )
            }).catch( reason => {
                console.error(reason)
                res.status(409).send('[ERROR:Connect] ' + reason)
            })
        } catch(err){
            console.error(err);
            res.status(409).send('[ERROR:Exception] ' + err)
        }

    } else {
        res.status(400).send('Faltan datos')
    }
})

module.exports = { route };