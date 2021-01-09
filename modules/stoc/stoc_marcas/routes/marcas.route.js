const express = require('express');
const { Pool } = require('pg')

let route = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV == 'production' ? {rejectUnauthorized: false} : ''
})

console.log('MARCAS::')
console.log(pool)

route.get('/', (req,res) => {

    try{
        pool.connect().then( (client) => {
            client.query('SELECT * FROM STOC_MARCAS').then( (result) => {
                res.status(200).send( result )
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