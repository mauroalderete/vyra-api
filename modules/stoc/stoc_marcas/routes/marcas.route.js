const express = require('express');
const { Pool } = require('pg')
const MarcaModel = require('../models/marcas.model')

let route = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV == 'production' ? {rejectUnauthorized: false} : ''
})

route.get('/', (req,res) => {

    try{
        pool.connect().then( (client) => {
            client.query('SELECT * FROM STOC_MARCAS').then( (result) => {

                const marcas = []

                for (const row in result.rows){
                    const marca = new MarcaModel(row)

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
        res.status(409).send('[ERROR:Undefined] ' + err)
    }
})

module.exports = { route };