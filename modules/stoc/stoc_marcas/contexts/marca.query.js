const Marca = require('../models/marca.model')

module.exports =

class MarcaQueryable extends Marca {

    constructor(obj){
        super(obj)
    }

    isSelectable(){
        return ( this.marca != undefined && this.marca != null && this.marca > 0 )
    }

    isInsertable(){
        return ( this.nombre != undefined && this.nombre != null );
    }

    isUpdatable(){
        return ( this.isInsertable() && this.isSelectable() )
    }

    isDeletable(){
        return ( this.isSelectable() )
    }

    selectQuery(){
        return this.isSelectable()? `SELECT * FROM STOC_MARCAS WHERE marc_marca = ${this.marca}` : 'SELECT * FROM STOC_MARCAS'
    }

    deleteQuery(){
        return this.isDeletable()? `DELETE FROM STOC_MARCAS WHERE marc_marca = ${this.marca} RETURNING 1` : ''
    }

    insertQuery(){
        return this.isInsertable()? `
        INSERT INTO STOC_MARCAS (
            marc_nombre,
            marc_notas
        ) VALUES (
            '${this.nombre}',
            ${this.notas==undefined? null: `'${this.notas}'` }
        ) RETURNING marc_marca, marc_nombre, marc_notas, marc_baja` : ''
    }

    updateQuery(){
        return this.isUpdatable()? `
        UPDATE STOC_MARCAS SET
            marc_nombre = '${this.nombre}'
            ,marc_notas = ${this.notas==undefined? null: `'${this.notas}'`}
        WHERE marc_marca = ${this.marca} RETURNING STOC_MARCAS.*` : ''
    }

    fromContext(obj){
        this.marca = 'marc_marca' in obj? obj['marc_marca'] : undefined
        this.nombre = 'marc_nombre' in obj? obj['marc_nombre'] : undefined
        this.notas = 'marc_notas' in obj? obj['marc_notas'] : undefined

        return this
    }

    toModel(){
        return new Marca( this )
    }
}