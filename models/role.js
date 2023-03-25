const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    Role: {
        type: String,
        required: ['true', 'El rol es requerido']
    }
});

module.exports = model('Role', RoleSchema);