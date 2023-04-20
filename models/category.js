const { Schema, model, models } = require('mongoose');

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return {
        data
    };
};

module.exports = models['Categoria'] || model( 'Categoria', CategorySchema );