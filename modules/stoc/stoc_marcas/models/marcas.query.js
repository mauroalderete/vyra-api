const MarcaModel = require('./marcas.model')

module.exports = class MarcaQuery {
    constructor(obj){
        this._model = new MarcaModel(obj)
    }

    isInsertable(){
        return ( this._model.nombre != undefined && this._model.nombre != null );
    }

    isUpdatable(){
        return ( this.isInsertable && this._model.marca != undefined && this._model.marca != null && this._model.marca > 0 )
    }

    isDeletable(){
        return ( this._model.marca != undefined && this._model.marca != null && this._model.marca > 0 )
    }

    select() {
        return 'SELECT * FROM STOC_MARCAS'
    }

    selectById(id){
        return `SELECT * FROM STOC_MARCAS WHERE marca = ${id}`
    }

    delete(id){
        return `DELETE STOC_MARCAS WHERE marca = ${id}`
    }

    insert(){
        return this.isInsertable()? `
        INSERT INTO STOC_MARCAS (
            marc_nombre,
            marc_notas
        ) VALUES (
            '${this._model.nombre}',
            ${this._model.notas==undefined? null: `'${this._model.notas}'` }
        ) RETURNING marc_marca, marc_nombre, marc_notas, marc_baja` : ''
    }

    toModel(obj){
        console.log('toModel::', obj)
        const marca = new MarcaModel()
        for(var prop in marca){
            marca[prop] = `marc_${prop}` in obj? obj[`marc_${prop}`] : undefined
        }
        return marca
    }
}