module.exports = class MarcaModel {
    constructor(obj){
        this.marca = undefined
        this.nombre = undefined
        this.notas = undefined

        obj && this.populate(obj)
    }

    populate(obj){
        for(var prop in this){
            this[prop] = prop in obj? obj[prop] : undefined
        }
    }
}