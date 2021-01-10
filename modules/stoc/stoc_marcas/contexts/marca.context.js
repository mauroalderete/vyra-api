const Marca = require('../models/marca.model')
const MarcaQueryable = require('./marca.query')
const { Pool } = require('pg')

module.exports =

class MarcaContext {

    constructor(){
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV == 'production' ? {rejectUnauthorized: false} : ''
        })
    }

    select() {
        return new Promise( (resolve, reject) => {
            this.pool.connect().then( (client) => {
                const q = new MarcaQueryable()
                client.query( q.selectQuery() ).then( (result) => {
                    
                    client.release()

                    const marcas = []
                    result.rows.forEach( row=> {
                        marcas.push( new MarcaQueryable().fromContext(row).toModel() )
                    })
                    resolve(marcas)

                }).catch( reason => {
                    reject('[ERROR:Query] ' + reason)
                } )
            }).catch( reason => {
                reject('[ERROR:Connection] ' + reason)
            })
        } )
    }

    selectById(id) {
        return new Promise( (resolve, reject) => {
            this.pool.connect().then( (client) => {
                const q = new MarcaQueryable()
                console.log('selectById.id: ', id)
                q.marca = parseInt(id)
                console.log('asd: ', q)
                console.log('asd2: ', q.selectQuery())
                client.query( q.selectQuery() ).then( (result) => {
                    client.release()

                    if( result.rowCount>0 ){
                        resolve( new MarcaQueryable().fromContext( result.rows[0]).toModel() )
                    } else {
                        resolve(null)
                    }

                }).catch( reason => {
                    reject('[ERROR:Query] ' + reason)
                } )
            }).catch( reason => {
                reject('[ERROR:Connection] ' + reason)
            })
        } )
    }

    insert(obj){

        return new Promise( (resolve, reject) => {
            this.pool.connect().then( (client) => {

                const marcaQueryable = new MarcaQueryable( obj )

                if( marcaQueryable.isInsertable() ){
                    client.query( marcaQueryable.insertQuery() ).then( (result) => {

                        client.release()
                        resolve( marcaQueryable.fromContext(result.rows[0]).toModel() )

                    }).catch( reason => {
                        reject('[ERROR:Query] ' + reason)
                    } )

                } else {
                    reject('[ERROR:Query] La marca no es insertable')
                }

            }).catch( reason => {
                reject('[ERROR:Connection] ' + reason)
            })

        } )
    }

    update(obj){

        return new Promise( (resolve, reject) => {
            this.pool.connect().then( (client) => {

                const marcaQueryable = new MarcaQueryable( obj )

                if( marcaQueryable.isUpdatable() ){
                    client.query( marcaQueryable.updateQuery() ).then( (result) => {

                        console.log('RESULT: ', result)

                        client.release()
                        resolve( marcaQueryable.toModel() )

                    }).catch( reason => {
                        reject('[ERROR:Query] ' + reason)
                    } )

                } else {
                    reject('[ERROR:Query] La marca no es actualizable')
                }

            }).catch( reason => {
                reject('[ERROR:Connection] ' + reason)
            })

        } )
    }

    delete(obj){
        return new Promise( (resolve, reject) => {
            this.pool.connect().then( (client) => {

                const marcaQueryable = new MarcaQueryable( obj )

                console.log( 'DELETE: ', obj )
                console.log( 'isDeletable: ', marcaQueryable.isDeletable() )
                console.log( 'Query: ', marcaQueryable.deleteQuery() )

                if( marcaQueryable.isDeletable() ){
                    client.query( marcaQueryable.deleteQuery() ).then( (result) => {

                        client.release()
                        resolve()

                    }).catch( reason => {
                        reject('[ERROR:Query] ' + reason)
                    } )

                } else {
                    reject('[ERROR:Query] La marca no es eliminable')
                }

            }).catch( reason => {
                reject('[ERROR:Connection] ' + reason)
            })

        } )
    }
}